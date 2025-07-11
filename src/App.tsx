import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import InputFieldView from './frontend/pages/InputFieldView';
import GraphView from './frontend/pages/graphs/GraphsView';

function App() {

  const sendMessageBackend = () => {
    window.electron.sendCreateExpense({name:'jone doe', value: 10, category:  
    { 
        ID: 76,
        CATEGORY_NAME: "test",
    }
    , date: new Date(10-12-2000)});
  }

  const [showGraph, setShowGraph] = useState(false);

  return (
    <>
        <div>
            <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
        </div>

        <h1>Vite + React</h1>
        <div className="card">
            <button onClick={sendMessageBackend}>
                send message
            </button>
            <InputFieldView />
        </div>

        <div className="p-4">
            <button onClick={() => setShowGraph(prev => !prev)}>
                {showGraph ? 'Hide Graph' : 'Show Graph'}
            </button>
            {showGraph && <GraphView />}
        </div>
    </>
  )
}

export default App
