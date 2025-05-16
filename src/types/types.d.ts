type ViewData = {
    page: string
}

type StaticBackendData = {
    sum: number,
};

//the different events that we are using
type EventPlayLoadMapping = {
    subscribeStats: SubscribeStats,
    getStaticBackendData: GetStaticBackendData,
}

type UnsubscribeToRepeatedBackendResonseFunction = () => void;

interface Window {
    electron: {
        subscribeStats: (callback: (subscribeStats: SubscribeStats) => void) => UnsubscribeToRepeatedBackendResonseFunction;
        getStaticBackendData: () => Promise<StaticBackendData>;
    };
}