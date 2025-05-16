type ExpenseData = {
    name: string,
    value: number,
}

type StaticBackendData = {
    sum: number,
};

//the different events that we are using
type EventPlayLoadMapping = {
    subscribeStats: SubscribeStats,
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