// hooks/useExpenseManager.ts
import { useState } from 'react';

export function useCategoryManager() {
  
      const [categories, setCategories] = useState<CategoryData[]>([]);
      const [editId, setEditId] = useState<number | null>(null);
      const [editCategoryName, setEditCategoryName] = useState<string>('');
  
    const getData = async () => {
       try {
            const data: CategoryData[] = await window.electron.getAllCategories();
            console.log('test' , data);
            setCategories(data);           
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const deleteData = async (categoryID: number) => {
        try {
            await window.electron.sendDeleteCatagory(categoryID);
            setCategories((prev) => prev.filter((e) => e.ID !== categoryID))
        } catch (error) {
            console.error('Error deleting category ' , error);
        };
    }

    const saveCompanyUpdate = async () => {
        try {
            if(editId !== null){
            await window.electron.sendUpdateCategory({
                ID: editId,
                CATEGORY_NAME: editCategoryName
            });
            setCategories((prev) => 
                prev.map((e) => e.ID == editId 
                    ? {...e, CATEGORY_NAME: editCategoryName} 
                    : e
                )
            );
            setEditId(null);
            }            
        } catch (error) {
            console.error('Error updaing category ' , error);
        }
    }

    const startCaterogyEditing = async (data: CategoryData) => {
        setEditId(data.ID);
        setEditCategoryName(data.CATEGORY_NAME);
    }


  return {
    categories,
    editId, 
    setEditId, 
    editCategoryName, 
    setEditCategoryName,
    getData,
    deleteData,
    saveCompanyUpdate,
    startCaterogyEditing
  };
}
