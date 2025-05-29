import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'




function App() {
  const [count, setCount] = useState(0)
  const [unsub, setUnsub] = useState<(() => void) | null>(null);

  const toggleDataListener = () => {
    if (unsub) {
      // Stop listening
      unsub(); // call the unsubscribe function
      setUnsub(null);
      console.log("Stopped listening to data.");
    } else {
      // Start listening
      const newUnsub = window.electron.subscribeStats((response) => {
        console.log("Received:", response);
      });
      setUnsub(() => newUnsub); // store unsub function
      console.log("Started listening to data.");
    }
  };

    const sendMessageBackend = () => {
        window.electron.sendCreateExpense({name:'jone doe', value: 10, date: new Date(10-12-2000)});
  }

  const getTodayDateString = (): string => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [dob, setDob] = useState(getTodayDateString());

  const collectFormData = () => {
    const nameInput = document.getElementById('nameInput') as HTMLInputElement;
    const valueInput = document.getElementById('ageInput') as HTMLInputElement;

    window.electron.sendCreateExpense({
      name: nameInput.value,
      value: Number(valueInput.value),
      date: new Date(dob),
    });
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
         <button onClick={sendMessageBackend}>
          send message
        </button>
        
        <div className="card">
          <input type="text" id="nameInput" />
          <input type="number" id="ageInput" />
          <input
            type="date"
            id="dobInput"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <button onClick={collectFormData}>Submit</button>
        </div>
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
