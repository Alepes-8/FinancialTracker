import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  /*useEffect(() => {
    const unsub = window.electron.sendDataToFrontEndListener((response) => console.log(response));
    return unsub; //if we return unsub, it will close down if we adjust page or unmount it.
  }, [])
**/

  const [unsub, setUnsub] = useState<(() => void) | null>(null);

  const toggleDataListener = () => {
    if (unsub) {
      // Stop listening
      unsub(); // call the unsubscribe function
      setUnsub(null);
      console.log("Stopped listening to data.");
    } else {
      // Start listening
      const newUnsub = window.electron.subscribeData((response) => {
        console.log("Received:", response);
      });
      setUnsub(() => newUnsub); // store unsub function
      console.log("Started listening to data.");
    }
  };


  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={toggleDataListener}>
          {unsub ? 'Stop Listening' : 'Start Listening'}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
