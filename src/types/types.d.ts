type ViewData = {
    page: string
}

type StaticBackendData = {
    sum: number,
};

//the different events that we are using
type EventPlayLoadMapping = {
    subscribeChangeView: SubscribeChangeView,
    getStaticBackendData: GetStaticBackendData,
}

type UnsubscribeToRepeatedBackendResonseFunction = () => void;

interface Window {
    electron: {
        subscribeChangeView: (callback: (viewData: ViewData) => void) => UnsubscribeToRepeatedBackendResonseFunction;
        getStaticBackendData: () => Promise<StaticBackendData>;
    };
}