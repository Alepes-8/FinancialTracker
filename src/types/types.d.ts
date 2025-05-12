type RepeatedBackendResponse = {
    log: number
}

type StaticBackendData = {
    sum: number,
};

//the different events that we are using
type EventPlayLoadMapping = {
    repeatedBackendResponse: RepeatedBackendResponse,
    getStaticBackendData: GetStaticBackendData
}

interface Window {
    electron: {
        sendDataToFrontEndListener: (callback: (repeatedBackendResponse: RepeatedBackendResponse) => void) => void;
        getStaticBackendData: () => Promise<StaticBackendData>
    };
}