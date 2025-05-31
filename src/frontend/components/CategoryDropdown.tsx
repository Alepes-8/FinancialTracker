import React, { useState } from 'react';

type Props = {
  categories: string[];
  selected: string;
  onChange: (value: string) => void;
  onAddNewCategory: (newCategory: string) => void;
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
      onChange(''); // Clear selection while typing
    } else {
      setShowNewInput(false);
      onChange(value);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddNewCategory(newCategory.trim());
      onChange(newCategory.trim());
      setNewCategory('');
      setShowNewInput(false);
    }
  };

  return (
    <div>
      <label htmlFor="category-select">Category:</label>
      <select
        id="category-select"
        value={selected}
        onChange={(e) => handleSelectChange(e.target.value)}
      >
        <option value="">-- Select a category --</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
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
