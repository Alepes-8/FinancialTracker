import React from 'react';
import CategoryItem from './CategoryItem';

interface CategoryListPop {
    categories: CategoryData[];
    editId: number | null;
    setEditId: React.Dispatch<React.SetStateAction<number | null>>; 
    editCategoryName: string;
    setEditCategoryName: React.Dispatch<React.SetStateAction<string>>; 
    deleteData: (id: number) => void;
    saveCompanyUpdate: () => void;
    startCaterogyEditing: (data: CategoryData) => void;
};


const CategoryList: React.FC<CategoryListPop> = ({
    categories,
    editId,
    setEditId,
    editCategoryName,
    setEditCategoryName,
    deleteData,
    saveCompanyUpdate,
    startCaterogyEditing
}) => {

    return (
        <div>
            <ul>
            {categories.map((cat) => (
                <CategoryItem 
                    catId={cat.ID}
                    isEditing={cat.ID === editId}
                    categorie={cat}
                    setEditId={setEditId}
                    editCategoryName={editCategoryName}
                    setEditCategoryName={setEditCategoryName}
                    deleteData={deleteData}
                    saveCompanyUpdate={saveCompanyUpdate}
                    startCaterogyEditing={startCaterogyEditing}
                />
                ))}
            </ul>

        </div>
    )
};

export default CategoryList;