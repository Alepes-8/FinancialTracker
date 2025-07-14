// hooks/useExpenseManager.ts
import { useState } from 'react';

export function useCategorySum() {

    const [categorySums, setCategorySum] = useState<CategorySumData[]>([])

    const getSumOfCategories = async() => {
      try {
        const data = await window.electron.getAllCategorySumValues();
        setCategorySum(data);
      } catch (e) {
        console.error('Failed to fetch data:', e);
      }
    }
    
    return {
        categorySums,
        getSumOfCategories,
    };
}
