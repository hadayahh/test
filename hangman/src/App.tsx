import { useState, useEffect, useCallback } from 'react'
import words from "./wordList.json"

import {HangmanDrawing} from "./Hangmandrawing"
import { HangmanWord } from './HangmanWord'
import { Keyboard } from './Keyboard'

import './App.css';

function getWord(){
  return words[Math.floor(Math.random() * words.length)]
}

function App() {

  const [wordToGuess, setWordToGuess] = useState(getWord())
    // return 'test'
  
  const [guessedLetters, setGuessedLetters] = useState <string[]>([])
  //explicity defining a type for useState
  //Ex: useState<string>('') or useState<number>(0)
  //In this Example: useState <string[]>([])
  //An array of strings

  const incorrectLetters = guessedLetters.filter(letter => {
   return !wordToGuess.includes(letter)
  })

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  function addGuessedLetter(letter: string){
    if(guessedLetters.includes(letter) || isLoser || isWinner) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }
  
  const lettersToCheck = 'abcdefghijklmnopqrstuvwxyz'.split('');

  useEffect(() => {
    
    console.log('wordToGuess:',wordToGuess)
    console.log('lettersToCheck:',lettersToCheck)
    
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      console.log(key)
      if(!lettersToCheck.includes(key)) return
       
      e.preventDefault()
      addGuessedLetter(key)
      
    }
    
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  },[guessedLetters, isWinner, isLoser])
  
  console.log(guessedLetters)

  useEffect(() => {
      const handler = (e: KeyboardEvent) => {
      const key = e.key;
      
      if(key !== "Enter") return
      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }
    
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  },[])

  return (
    
    <div style={{maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem', margin: 'auto', alignItems: 'center'}}>
      <h3 style={{fontSize: "3rem"}}>Have at it!</h3>
      <div style={{fontSize: '2rem', textAlign: 'center'}}>{isWinner && 'Winner! - Refresh to try again.'} {isLoser && 'Nice Try! - Refresh to try again.'}</div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanWord reveal={isLoser} wordToGuess={wordToGuess} guessedLetters={guessedLetters}/>
      <div style={{alignSelf: "stretch"}}>
        <Keyboard disabled={isWinner || isLoser} activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))} inactiveLetters={incorrectLetters} addGuessedLetter={addGuessedLetter}/>
      </div>
    </div>
  )
}

export default App
