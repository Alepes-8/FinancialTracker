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
    const [sortingDirection, setSortingDirection] = useState<string>('desc');  

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

    const sortedExpenses = [...expenses].sort((a, b) => {
        switch(currentSortingOption) {
            case "Amount":
                if(typeof a.SUM === 'number' && typeof b.SUM == 'number'){
                    return sortingDirection === 'desc' ? b.SUM - a.SUM : a.SUM - b.SUM;
                };
                return 0;
            case "Name":
                if(typeof a.EXPENSE_REASON === 'string' && typeof b.EXPENSE_REASON == 'string'){
                    return sortingDirection === 'desc' 
                    ? a.EXPENSE_REASON.localeCompare(b.EXPENSE_REASON) 
                    : b.EXPENSE_REASON.localeCompare(a.EXPENSE_REASON);
                };
                return 0;
            default:
                return sortingDirection === 'desc' ? b.ID - a.ID : a.ID - b.ID;
        }
    });

    return (
        <div>
            <button onClick={getData}>Load Expenses</button>

            <ExpenseControls
                currentSortingOption={currentSortingOption}
                setCurrentSortingOption={setCurrentSortingOption}
                sortingDirection={sortingDirection}
                setSortingDirection={setSortingDirection}
                itemsPerPage={itemsPerPage}
                setiIemsPerPage={setiIemsPerPage}
                setVisibleRange={setVisibleRange}            
            />
            
            <ExpenseList
                expenses={sortedExpenses.slice(visibleRange[0], visibleRange[1])}                
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
