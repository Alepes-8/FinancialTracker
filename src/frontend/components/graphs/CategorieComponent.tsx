import React, { useState } from 'react';

const CategorieComponent = () => {

    const [categories, setCategories] = useState<CategoryData[]>([])

    const getData = async () => {
       try {
            const data: CategoryData[] = await window.electron.getAllCategories();
            console.log('test' , data);
            setCategories(data);           
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    return (
        <div>
            <button onClick={getData}>Load Categories</button>
            <ul>
                {categories.map((exp) => (
                <li key={exp.ID}>
                    {exp.CATEGORY_NAME}
                    
                </li>
                ))}
            </ul>

        </div>
    );
};

export default CategorieComponent;