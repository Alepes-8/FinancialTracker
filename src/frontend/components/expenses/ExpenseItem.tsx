import React from 'react';

type Props = {
  expense: ExpenseBackendData;
  isEditing: boolean;
  editedReason: string;
  editedSum: number;
  setEditedReason: (val: string) => void;
  setEditedSum: (val: number) => void;
  onDelete: (id: number) => void;
  onStartEdit: (exp: ExpenseBackendData) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
};

const ExpenseItem: React.FC<Props> = ({
  expense,
  isEditing,
  editedReason,
  editedSum,
  setEditedReason,
  setEditedSum,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit
}) => {
  if (isEditing) {
    return (
      <li>
        <input value={editedReason} onChange={(e) => setEditedReason(e.target.value)} />
        <input
          type="number"
          value={editedSum}
          onChange={(e) => setEditedSum(Number(e.target.value))}
        />
        <button onClick={() => onDelete(expense.ID)}>Delete</button>
        <button onClick={onSaveEdit}>Save</button>
        <button onClick={onCancelEdit}>Cancel</button>
      </li>
    );
  }

  return (
    <li>
      {expense.EXPENSE_REASON || 'No reason'} — ${expense.SUM}
      <button onClick={() => onDelete(expense.ID)}>Delete</button>
      <button onClick={() => onStartEdit(expense)}>Update</button>
    </li>
  );
};

export default ExpenseItem;
