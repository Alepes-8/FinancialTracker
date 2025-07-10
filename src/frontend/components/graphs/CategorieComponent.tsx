import React, { useState } from 'react';

const CategorieComponent = () => {

    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [editingId, SetEditingId] = useState<number | null>(null);
    const [editedCategories, setEtiedCategories] = useState<string>('');

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
            setCategories((prev) => prev.filter((e) => e.ID !== categoryID))
        } catch (error) {
            console.error('Error deleting category ' , error);
        };
    }

    const saveCompanyUpdate = async () => {
        try {
            setCategories((prev) => 
                prev.map((e) => e.ID == editingId 
                    ? {...e, CATEGORY_NAME: editedCategories} 
                    : e
                )
            );
            SetEditingId(null);
        } catch (error) {
            console.error('Error updaing category ' , error);
        }
    }

    const startCaterogyEditing = async (data: CategoryData) => {
        SetEditingId(data.ID);
        setEtiedCategories(data.CATEGORY_NAME);
    }

    return (
        <div>
            <button onClick={getData}>Load Categories</button>
            <ul>
                {categories.map((exp) => (
                <li key={exp.ID}>

                    {editingId == exp.ID ? 
                    (   
                        <>
                        <input
                            value = {editedCategories}
                            onChange={(e) => setEtiedCategories(e.target.value)}
                        />
                        <button onClick={() => deleteData(exp.ID)}> Delete </button>
                        <button onClick={() => saveCompanyUpdate()}> Save </button>
                        <button onClick={() => SetEditingId(null)}> Cancel </button>
                       </> 
                    ) : (
                        <>
                        {exp.CATEGORY_NAME}
                        <button onClick={() => deleteData(exp.ID)}> Delete </button>
                        <button onClick={() => startCaterogyEditing(exp)}> Update </button>
                        </>
                    )};
                    
                </li>
                ))}
            </ul>

        </div>
    );
};

export default CategorieComponent;