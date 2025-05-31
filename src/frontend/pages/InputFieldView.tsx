
import React, { useState } from 'react';
import CategoryDropdown from '../components/CategoryDropdown';
import { getTodayDateString } from '@/frontend/utils/dateUtils';

const InputFieldView = () => {

    const collectFormData = () => {
        const nameInput = document.getElementById('nameInput') as HTMLInputElement;
        const valueInput = document.getElementById('ageInput') as HTMLInputElement;

        window.electron.sendCreateExpense({
            name: nameInput.value,
            value: Number(valueInput.value),
            date: new Date(dob),
        });
    };

    const addNewCategory = (newCat: string) => {
        if (!categories.includes(newCat)) {
            setCategories((prev) => [...prev, newCat]);
        }
    };

    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState<string[]>([
        'Food',
        'Transport',
        'Utilities',
    ]);

    const [dob, setDob] = useState(getTodayDateString());

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