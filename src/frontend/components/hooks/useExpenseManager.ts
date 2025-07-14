// hooks/useExpenseManager.ts
import { useState } from 'react';

export function useExpenseManager(expenses: ExpenseBackendData[], 
    setExpenses: React.Dispatch<React.SetStateAction<ExpenseBackendData[]>>) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedReason, setEditedReason] = useState('');
  const [editedSum, setEditedSum] = useState(0);

  const getData = async () => {
    try {
      const data = await window.electron.getAllBackendExpenseData();
      setExpenses(data);
    } catch (e) {
      console.error('Failed to fetch data:', e);
    }
  };

  const deleteExpense = async (id: number) => {
    try {
      await window.electron.sendDeleteExpense(id);
      setExpenses(prev => prev.filter(e => e.ID !== id));
    } catch (e) {
      console.error('Delete failed:', e);
    }
  };

  const startEditing = (expense: ExpenseBackendData) => {
    setEditingId(expense.ID);
    setEditedReason(expense.EXPENSE_REASON ?? '');
    setEditedSum(expense.SUM);
  };

  const saveEdit = async () => {
    if (editingId == null) return;

    try {
      await window.electron.sendUpdateExpense({
        ID: editingId,
        SUM: editedSum,
        EXPENSE_REASON: editedReason
      });

      setExpenses(prev =>
        prev.map(e =>
          e.ID === editingId ? { ...e, SUM: editedSum, EXPENSE_REASON: editedReason } : e
        )
      );

      setEditingId(null);
    } catch (e) {
      console.error('Save failed:', e);
    }
  };

  return {
    expenses,
    editingId,
    editedReason,
    editedSum,
    setEditedReason,
    setEditedSum,
    getData,
    deleteExpense,
    startEditing,
    saveEdit,
    setEditingId
  };
}
