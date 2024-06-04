import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import Wordle from './components/Wordle';

function App() {
    const [solution, setSolution] = useState(null)

    useEffect(() => {
        fetch('https://noo0dle-words.s3.us-east-2.amazonaws.com/data.json').then(res => res.json()).then(json => {
            
            const randomsolution = json.solutions[Math.floor(Math.random() * json.solutions.length)];
            setSolution(randomsolution.word);
        })
    }, [])
    return (<div className='App'>
      <h1 style={{color:'white'}}>Noddle</h1>
      {solution && (<Wordle solution={solution}></Wordle>)}
    </div>);
}

export default App;