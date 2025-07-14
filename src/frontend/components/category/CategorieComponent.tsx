import React from 'react';
import { useCategoryManager } from '../hooks/useCatagoryManager';
import CategoryList from './CategoryList';

const CategorieComponent = () => {


    const {
        categories, 
        editId, 
        setEditId, 
        editCategoryName, 
        setEditCategoryName, 
        getData, 
        deleteData, 
        saveCompanyUpdate, 
        startCaterogyEditing
    } = useCategoryManager();


    return (
        <div>
            <button onClick={getData}>Load Categories</button>
            <CategoryList 
                categories={categories}
                editId={editId}
                setEditId={setEditId}
                editCategoryName={editCategoryName}
                setEditCategoryName={setEditCategoryName}
                deleteData={deleteData}
                saveCompanyUpdate={saveCompanyUpdate}
                startCaterogyEditing={startCaterogyEditing}
            />

        </div>
    );
};

export default CategorieComponent;