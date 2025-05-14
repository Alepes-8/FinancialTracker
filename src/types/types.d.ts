type SubScribeToRepeatedBackendData = {
    log: number
}

type StaticBackendData = {
    sum: number,
};

//the different events that we are using
type EventPlayLoadMapping = {
    SubScribeToRepeatedBackendData: SubScribeToRepeatedBackendData,
    getStaticBackendData: GetStaticBackendData,
}

type UnsubscribeToRepeatedBackendResonseFunction = () => void;

interface Window {
    electron: {
        sendDataToFrontEndListener: (callback: (subScribeToRepeatedBackendData: SubScribeToRepeatedBackendData) => void) => UnsubscribeToRepeatedBackendResonseFunction;
        getStaticBackendData: () => Promise<StaticBackendData>;
    };
}