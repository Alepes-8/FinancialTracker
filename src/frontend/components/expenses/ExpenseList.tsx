import React from 'react';
import ExpenseItem from './ExpenseItem';

type Props = {
  expenses: ExpenseBackendData[];
  editingId: number | null;
  editedReason: string;
  editedSum: number;
  setEditedReason: (val: string) => void;
  setEditedSum: (val: number) => void;
  onDelete: (id: number) => void;
  onStartEdit: (exp: ExpenseBackendData) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
};

const ExpenseList: React.FC<Props> = ({
  expenses,
  editingId,
  editedReason,
  editedSum,
  setEditedReason,
  setEditedSum,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}) => (
  <ul>
    {expenses.map((exp) => (
      <ExpenseItem
        key={exp.ID}
        expense={exp}
        isEditing={exp.ID === editingId}
        editedReason={editedReason}
        editedSum={editedSum}
        setEditedReason={setEditedReason}
        setEditedSum={setEditedSum}
        onDelete={onDelete}
        onStartEdit={onStartEdit}
        onSaveEdit={onSaveEdit}
        onCancelEdit={onCancelEdit}
      />
    ))}
  </ul>
);

export default ExpenseList;
