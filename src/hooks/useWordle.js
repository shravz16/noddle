import { useState } from "react";

const useWordle = (solution) =>{
    const [turn,setTurn] =useState(0);
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) 
    const [history, setHistory] = useState([]) 
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys,setUsedKeys] = useState({})
    const formatGuess = () => {
        
      let solutionArray=[...solution]
      let formatGuess = [...currentGuess].map((l) => {
        return {key:l,color:'grey'}
      })

      formatGuess.forEach((l,i)=>{
        if(solutionArray[i]===l.key){
            formatGuess[i].color='green'
            solutionArray[i]=null
        }
      })

      formatGuess.forEach((l,i)=>{
        if(solutionArray.includes(l.key) && l.color!=='green'){
            formatGuess[i].color='yellow'
            solutionArray[solutionArray.indexOf(l.key)]=null
        }
      })
      return formatGuess
    }
  
  
    const addNewGuess = (formatGuess) => {
        if(currentGuess===solution){
            setIsCorrect(true)
        }
        setGuesses((prev)=>{
            let newGuesses =[...prev]
            newGuesses[turn]=formatGuess
            return newGuesses
        })
        setHistory((prevHistory)=>{
            return [...prevHistory,currentGuess]
        })
        setTurn((prev)=>{
            return prev+1
        })
        setUsedKeys((prevUsedKeys)=>{
            
            formatGuess.forEach((l)=>{
                const currentColor = prevUsedKeys[l.key]
                if(l.color==='green'){
                    prevUsedKeys[l.key]='green'
                    return 
                }
                if(l.color==='yellow' && currentColor !=='green'){
                    prevUsedKeys[l.key]='yellow'
                    return
                }

                if(l.color==='grey' && currentColor !== 'green' && currentColor !=='yellow'){
                    prevUsedKeys[l.key]='grey'
                    return
                }
               
            })
            return prevUsedKeys
        })

    
        setCurrentGuess('')
    }
  

    const handleKeyup = ({key}) => {
        if(key === 'Enter'){
            if(turn>5){
                console.log('you used all your guess')
                return
            }
            if(history.includes(currentGuess)){
                alert('you already tired')
                return
            }
            if(currentGuess.length!==6){
                console.log('word must be 6 chars long')
                return
            }
            const format=formatGuess()
            addNewGuess(format)
       
        }
        if(key==='Backspace'){
            setCurrentGuess((prev)=>{
                return prev.slice(0,-1)
            })
        }
        if(/^[A-Za-z]$/.test(key)){
            if(currentGuess.length<6){
                setCurrentGuess((prev)=>{
                    return prev+key
                })
            }
        }
  
    }
  
    return {turn, currentGuess, guesses, isCorrect,usedKeys, handleKeyup}



}
export default useWordle