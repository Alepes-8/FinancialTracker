//Dropdowns, pagination controls

import React from 'react';

interface ExpenseControlsProps {
  currentSortingOption: string;
  setCurrentSortingOption: React.Dispatch<React.SetStateAction<string>>;
  itemsPerPage: number;
  setiIemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setVisibleRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const ExpenseControls: React.FC<ExpenseControlsProps> = ({
    currentSortingOption,
    setCurrentSortingOption,
    itemsPerPage,
    setiIemsPerPage,
    setVisibleRange
}) => {

    const showAmount: number[] = [5,10,25,50];
    const sortingOptions: string[] = ["Recently Added","Name","Amount"];

    const updateShowingExpenses = async (newRangeSum: number) => {
        setiIemsPerPage(newRangeSum)
        setVisibleRange(([lowerBound]) => [
            lowerBound,
            lowerBound + newRangeSum - 1,
        ]);
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
            
        </div>
    );
};

export default ExpenseControls;