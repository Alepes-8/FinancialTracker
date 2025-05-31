import React, { useState } from 'react';

type Props = {
  categories: CategoryData[];
  selected: CategoryData | null;
  onChange: (value: CategoryData | null) => void;
  onAddNewCategory: (newCategory: CategoryData) => void;
};
const CategoryDropdown: React.FC<Props> = ({
  categories,
  selected,
  onChange,
  onAddNewCategory,
}) => {
  const [showNewInput, setShowNewInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleSelectChange = (value: string) => {
    if (value === '__new__') {
      setShowNewInput(true);
      onChange(null);
    } else {
      const selectedCat = categories.find((cat) => cat.id.toString() === value) || null;
      setShowNewInput(false);
      onChange(selectedCat);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCat: CategoryData = {
        id: Math.max(0, ...categories.map((c) => c.id)) + 1, // Temporary ID
        category_name: newCategory.trim(),
      };
      onAddNewCategory(newCat);
      onChange(newCat);
      setNewCategory('');
      setShowNewInput(false);
    }
  };

  return (
    <div>
      <label htmlFor="category-select">Category:</label>
      <select
        id="category-select"
        value={selected?.id ?? ''}
        onChange={(e) => handleSelectChange(e.target.value)}
      >
        <option value="">-- Select a category --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.category_name}
          </option>
        ))}
        <option value="__new__">+ Create New</option>
      </select>

      {showNewInput && (
        <div style={{ marginTop: '0.5rem' }}>
          <input
            type="text"
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button onClick={handleAddCategory}>Add</button>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
