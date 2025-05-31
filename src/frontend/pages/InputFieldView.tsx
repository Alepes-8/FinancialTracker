
import React, { useEffect, useState } from 'react';
import CategoryDropdown from '../components/CategoryDropdown';
import { getTodayDateString } from '@/frontend/utils/dateUtils';

const InputFieldView = () => {

    const collectFormData = () => {
        const nameInput = document.getElementById('nameInput') as HTMLInputElement;
        const valueInput = document.getElementById('ageInput') as HTMLInputElement;
        
        window.electron.sendCreateExpense({
            name: nameInput.value,
            value: Number(valueInput.value),
            category: selectedCategory, 
            date: new Date(dob),
        });
    };

    const addNewCategory = (newCat: CategoryData) => {
        if (!categories.find((c) => c.id === newCat.id)) {
            setCategories((prev) => [...prev, newCat]);
        }
    };

    const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
    const [categories, setCategories] = useState<CategoryData[]>([]);

    const [dob, setDob] = useState(getTodayDateString());

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data: CategoryData[] = await window.electron.getAllCategories();
                console.log('test' , data);
                setCategories(data);           
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }

        fetchCategories();
    }, []);

    return (
        <div className="card">
            <input type="text" id="nameInput" />
            <input type="number" id="ageInput" />
            <CategoryDropdown
                categories={categories}
                selected={selectedCategory}
                onChange={setSelectedCategory}
                onAddNewCategory={addNewCategory}
            />
            <input
                type="date"
                id="dobInput"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
            />
            <button onClick={collectFormData}>Submit</button>
        </div>
    );
};

export default InputFieldView;