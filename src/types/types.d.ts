type ExpenseData = {
    name: string,
    value: number,
    date: Date
}

type ExpenseBackendData = {
    ID: number,
    SUM: number,
    EXPENSE_REASON: string
}

//the different events that we are using
type EventPlayLoadMapping = {
    subscribeStats: subscribeStats,    
    getAllBackendExpenseData: GetStaticBackendData,
    sendCreateExpense: ExpenseData,
}

type UnsubscribeToRepeatedBackendResonseFunction = () => void;

interface Window {
    electron: {
        subscribeStats: (callback: (subscribeStats: SubscribeStats) => void) => UnsubscribeToRepeatedBackendResonseFunction;
        getAllBackendExpenseData: () => Promise<ExpenseBackendData[]>;
        sendCreateExpense: (expenseData: ExpenseData) => void;
    };
}