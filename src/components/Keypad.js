import React,{useEffect, useState} from 'react'

export default function Keypad({usedKeys}){
    const[letters,setLetters] = useState(null)
    useEffect(()=>{
        fetch('https://noo0dle-words.s3.us-east-2.amazonaws.com/data.json',{  
           }).then(res => res.json()).then(json=>{
            setLetters(json.letters)
        })
    })
    return (
        <div className='keypad'>
            {
                letters && letters.map(l =>{
                    const color=usedKeys[l.key]

                    return(
                        <div key={l.key} className={color}>{l.key}</div>
                    )
                })
            }
        </div>
    )
}