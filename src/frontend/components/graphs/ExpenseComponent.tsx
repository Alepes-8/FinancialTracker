import React, { useState } from 'react';

interface ExpenseComponentProps {
  expenses: ExpenseBackendData[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseBackendData[]>>;
};

const ExpenseComponent: React.FC<ExpenseComponentProps> = ({ expenses, setExpenses }) => {

    const getData = async () => {
        try {
        const data: ExpenseBackendData[] = await window.electron.getAllBackendExpenseData();
        setExpenses(data);
        } catch (error) {
        console.error('Failed to fetch data:', error);
        }
    };

    const deleteData = async (id: number) => {
        try{
            await window.electron.sendDeleteExpense(id)
            setExpenses((prev) => prev.filter((e) => e.ID !== id)); // update UI
        } catch (error) {
            console.error('Deleting data failed:', error);
        }
    };

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedReason, setEditedReason] = useState<string>('');
    const [editedSum, setEditedSum] = useState<number>(0);

    const startExpenseEditing = (expense: ExpenseBackendData) => {
        setEditingId(expense.ID);
        setEditedReason(expense.EXPENSE_REASON || '');
        setEditedSum(expense.SUM);
    };

    const saveExpenseUpdate = async () => {
        try{
            if(editingId != null){
                await window.electron.sendUpdateExpense({
                    ID: editingId, 
                    SUM: editedSum,
                    EXPENSE_REASON: editedReason
                });
                setExpenses((prev) => 
                prev.map((e) => 
                    e.ID == editingId ? 
                        { ...e, EXPENSE_REASON: editedReason, SUM: editedSum } 
                        : e
                )
                ); // update UI
                setEditingId(null);
            }
        }catch (error) {
            console.error('Updating data failed:', error);
        };
    };

    return (
        <div>
            <button onClick={getData}>Load Expenses</button>
            <ul>
                {expenses.map((exp) => (
                <li key={exp.ID}>
                    {editingId == exp.ID ? 
                    (   
                        <>
                        <input
                            value = {editedReason}
                            onChange={(e) => setEditedReason(e.target.value)}
                        />
                        <input
                            typeof='number'
                            value = {editedSum}
                            onChange={(e) => setEditedSum(Number(e.target.value))}
                        />
                        <button onClick={() => deleteData(exp.ID)}> Delete </button>
                        <button onClick={() => saveExpenseUpdate()}> Save </button>
                        <button onClick={() => setEditingId(null)}> Cancel </button>
                       </> 
                    ) : (
                        <>
                        {exp.EXPENSE_REASON || 'No reason'} — ${exp.SUM}
                        <button onClick={() => deleteData(exp.ID)}> Delete </button>
                        <button onClick={() => startExpenseEditing(exp)}> Update </button>
                        </>
                    )};
                </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseComponent;