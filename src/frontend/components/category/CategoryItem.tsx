import React from 'react';

interface CategoryItemPop {
    catId: number,
    isEditing: boolean;
    categorie: CategoryData;
    setEditId: React.Dispatch<React.SetStateAction<number | null>>; 
    editCategoryName: string;
    setEditCategoryName: React.Dispatch<React.SetStateAction<string>>; 
    deleteData: (id: number) => void;
    saveCompanyUpdate: () => void;
    startCaterogyEditing: (data: CategoryData) => void;
};


const CategoryItem: React.FC<CategoryItemPop> = ({
    catId,
    isEditing,
    categorie,
    setEditId,
    editCategoryName, 
    setEditCategoryName,
    deleteData,
    saveCompanyUpdate,
    startCaterogyEditing
   
}) => {

        if (isEditing) {
            return ( 
                <li>
                    <input
                        value = {editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                    />
                    <button onClick={() => deleteData(catId)}> Delete </button>
                    <button onClick={() => saveCompanyUpdate()}> Save </button>
                    <button onClick={() => setEditId(null)}> Cancel </button>
                </li>
            );
        } 
        return  (
            <li>
                {categorie.CATEGORY_NAME}
                <button onClick={() => deleteData(catId)}> Delete </button>
                <button onClick={() => startCaterogyEditing(categorie)}> Update </button>
            </li>
        );
};

export default CategoryItem;