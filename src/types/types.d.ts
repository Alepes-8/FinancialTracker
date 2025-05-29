type ExpenseData = {
    name: string,
    value: number,
    date: Date
}

type StaticBackendData = {
    sum: number,
};

//the different events that we are using
type EventPlayLoadMapping = {
    subscribeStats: subscribeStats,    
    getStaticBackendData: GetStaticBackendData,
    sendCreateExpense: ExpenseData,
}

type UnsubscribeToRepeatedBackendResonseFunction = () => void;

interface Window {
    electron: {
        subscribeStats: (callback: (subscribeStats: SubscribeStats) => void) => UnsubscribeToRepeatedBackendResonseFunction;
        getStaticBackendData: () => Promise<StaticBackendData>;
        sendCreateExpense: (expenseData: ExpenseData) => void;
    };
}