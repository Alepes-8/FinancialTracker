type ViewData = {
    page: string
}

type StaticBackendData = {
    sum: number,
};

//the different events that we are using
type EventPlayLoadMapping = {
    subscribeData: subscribeData,
    getStaticBackendData: GetStaticBackendData,
}

type UnsubscribeToRepeatedBackendResonseFunction = () => void;

interface Window {
    electron: {
        subscribeData: (callback: (viewData: ViewData) => void) => UnsubscribeToRepeatedBackendResonseFunction;
        getStaticBackendData: () => Promise<StaticBackendData>;
    };
}