type ExpenseData = {
    name: string,
    value: number,
    category: CategoryData | null,
    date: Date
}

type ExpenseBackendData = {
    ID: number,
    SUM: number,
    EXPENSE_REASON: string
}

type CategoryData = {
    ID: number,
    CATEGORY_NAME: string,
}

//the different events that we are using
type EventPlayLoadMapping = {
    subscribeStats: subscribeStats,    
    getAllBackendExpenseData: GetStaticBackendData,
    getAllCategories: GetAllCategories,
    sendCreateExpense: ExpenseData,
    sendUpdateExpense: ExpenseBackendData,
    sendDeleteExpense: number,
}

type UnsubscribeToRepeatedBackendResonseFunction = () => void;

interface Window {
    electron: {
        subscribeStats: (callback: (subscribeStats: SubscribeStats) => void) => UnsubscribeToRepeatedBackendResonseFunction;
        getAllBackendExpenseData: () => Promise<ExpenseBackendData[]>;
        getAllCategories: () => Promise<CategoryData[]>;
        sendCreateExpense: (expenseData: ExpenseData) => void;
        sendUpdateExpense: (expenseData: ExpenseBackendData) => void;
        sendDeleteExpense: (expenseId: number) => void;
    };
}