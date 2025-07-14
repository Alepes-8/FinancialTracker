//Dropdowns, pagination controls

import React, { useState } from 'react';

interface ExpenseControlsProps {
    currentSortingOption: string;
    setCurrentSortingOption: React.Dispatch<React.SetStateAction<string>>;
    sortingDirection: string;
    setSortingDirection: React.Dispatch<React.SetStateAction<string>>; 
    itemsPerPage: number;
    setiIemsPerPage: React.Dispatch<React.SetStateAction<number>>;
    setVisibleRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const ExpenseControls: React.FC<ExpenseControlsProps> = ({
    currentSortingOption,
    setCurrentSortingOption,
    sortingDirection,
    setSortingDirection,
    itemsPerPage,
    setiIemsPerPage,
    setVisibleRange
}) => {

    const showAmount: number[] = [5,10,25,50];
    const sortingOptions: string[] = ["Recently Added","Name","Amount"];
    const [isChecked, setIsChecked] = useState<boolean>(false);


    const updateShowingExpenses = async (newRangeSum: number) => {
        setiIemsPerPage(newRangeSum)
        setVisibleRange(([lowerBound]) => [
            lowerBound,
            lowerBound + newRangeSum - 1,
        ]);
    }

    const changeSortingDirection = async () => {
        setIsChecked((state) => state = !state);
        setSortingDirection((dir) => dir === "asc" ? dir = "desc" : dir = "asc");
    }

    return (
        <div>
           <select
                id="show-expense-amount-select"
                value={itemsPerPage}
                onChange={(e) => updateShowingExpenses(Number(e.target.value))}
            >
                {showAmount.map((amount) => (
                    <option key={amount} value={amount}>
                        {amount}
                    </option>
                ))}
            </select>
            
            <select
                id="sort-expenses"
                value={currentSortingOption}
                onChange={(e) => setCurrentSortingOption(e.target.value)}
            >
                {sortingOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            <label>
                <input 
                    type='checkbox'
                    checked={isChecked}
                    onChange={changeSortingDirection}
                />
                {sortingDirection}
            </label>
            
                    
        </div>
    );
};

export default ExpenseControls;