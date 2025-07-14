import React, { useState } from 'react';
import { useExpenseManager } from '../hooks/useExpenseManager';
import ExpenseList from './ExpenseList';
import ExpenseControls from './ExpenseControls';

interface ExpenseComponentProps {
    expenses: ExpenseBackendData[];
    setExpenses: React.Dispatch<React.SetStateAction<ExpenseBackendData[]>>;
}

const ExpenseComponent = ({ expenses, setExpenses }: ExpenseComponentProps) => {

    const [currentSortingOption, setCurrentSortingOption] = useState<string>("Recently Added");
    const [itemsPerPage, setiIemsPerPage] = useState<number>(25);
    const [visibleRange, setVisibleRange] = useState<[number, number]>([0, itemsPerPage]);  

    const {
        editingId,
        editedReason,
        editedSum,
        setEditedReason,
        setEditedSum,
        getData,
        deleteExpense,
        startEditing,
        saveEdit,
        setEditingId
    } = useExpenseManager(expenses, setExpenses);

    /*const sortedExpenses = [...expenses].sort((a, b) => {
        switch (currentSortingOption) {
            case "Name":
                return a.EXPENSE_REASON.localeCompare(b.EXPENSE_REASON);
            case "Amount":
                return a.SUM - b.SUM;
        default:
            return a.ID - b.ID; // assuming 'DATE' exists in expense data
        }
    });
*/
    return (
        <div>
            <button onClick={getData}>Load Expenses</button>

            <ExpenseControls
                currentSortingOption={currentSortingOption}
                setCurrentSortingOption={setCurrentSortingOption}
                itemsPerPage={itemsPerPage}
                setiIemsPerPage={setiIemsPerPage}
                setVisibleRange={setVisibleRange}            
            />
            
            <ExpenseList
                expenses={expenses.slice(visibleRange[0], visibleRange[1])}                
                editingId={editingId}
                editedReason={editedReason}
                editedSum={editedSum}
                setEditedReason={setEditedReason}
                setEditedSum={setEditedSum}
                onDelete={deleteExpense}
                onStartEdit={startEditing}
                onSaveEdit={saveEdit}
                onCancelEdit={() => setEditingId(null)}
            />
        </div>
        );
    };

export default ExpenseComponent;
