import React, { useState } from 'react';

interface ExpenseComponentProps {
  expenses: ExpenseBackendData[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseBackendData[]>>;
};

const ExpenseComponent: React.FC<ExpenseComponentProps> = ({ expenses, setExpenses }) => {

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedReason, setEditedReason] = useState<string>('');
    const [editedSum, setEditedSum] = useState<number>(0);
    const [showSum, setShowSum] = useState<number>(25);
    const [showExpenseRange, setShowExpenseRange] = useState<[number, number]>([0, showSum]);
    const showAmount: number[] = [5,10,25,50];

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

    const printValue = async () => {
        console.log(showSum);
        console.log(showExpenseRange);
    }

    const moveRanges = (changeValue: number) => {
        setShowExpenseRange(([lowerBound]) => {
            const proposedLower = lowerBound + changeValue;
            const newLowerRange = Math.max(0, Math.min(proposedLower, expenses.length - showSum));
            const newUpperRange = newLowerRange + showSum - 1;
            return [newLowerRange, newUpperRange];
        });
    };

    const updateShowingExpenses = async (newRangeSum: number) => {
        setShowSum(newRangeSum)
        setShowExpenseRange(([lowerBound]) => [
            lowerBound,
            lowerBound + newRangeSum - 1,
        ]);
    }

    return (
        <div>
            <button onClick={getData}>Load Expenses</button>
            <select
                id="show-expense-amount-select"
                value={showSum}
                onChange={(e) =>updateShowingExpenses(Number(e.target.value))}
            >
                {showAmount.map((amount) => (
                <option key={amount} value={amount}>
                    {amount}
                </option>
                ))}
            </select>

            <ul>
                {expenses.map((exp, index) => (
                    ((index >= showExpenseRange[0] && index <= showExpenseRange[1] ) && (
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
                    ))
                ))}
            </ul>
             <div>
                <p> showing expenses of between: {showExpenseRange[0]} - {showExpenseRange[1]}  </p>
                <button onClick={() => moveRanges(-showSum)}> previous expenses </button>
                <button onClick={() => moveRanges(showSum)}> next expenses</button>
                <button onClick={printValue}> print values </button>
            </div>
        </div>
    );
};

export default ExpenseComponent;