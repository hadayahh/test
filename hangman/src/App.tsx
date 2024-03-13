import { useState, useEffect, useCallback } from 'react'
import words from "./wordList.json"

import {HangmanDrawing} from "./Hangmandrawing"
import { HangmanWord } from './HangmanWord'
import { Keyboard } from './Keyboard'


function App() {

  const [wordToGuess, setWordToGuess] = useState(() => {
    // return 'test'
    return words[Math.floor(Math.random() * words.length)]
  })
  
  const [guessedLetters, setGuessedLetters] = useState <string[]>([])
  //explicity defining a type for useState
  //Ex: useState<string>('') or useState<number>(0)
  //In this Example: useState <string[]>([])
  //An array of strings

  const incorrectLetters = guessedLetters.filter(letter => {
   return !wordToGuess.includes(letter)
  })

  function addGuessedLetter(letter: string){
    if(guessedLetters.includes(letter)) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }
  
  const lettersToCheck = 'abcdefghijklmnopqrstuvwxyz'.split('');
  useEffect(() => {
    
    console.log('wordToGuess:',wordToGuess)
    console.log('lettersToCheck:',lettersToCheck)
    
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if(!lettersToCheck.includes(key)) return
       
      e.preventDefault()
      addGuessedLetter(key)
      
    }
    
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  },[guessedLetters])
  console.log(guessedLetters)
  return (
    <div style={{maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem', margin: 'auto', alignItems: 'center'}}>
      <div style={{fontSize: '2rem', textAlign: 'center'}}>Lose Win</div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanWord wordToGuess={wordToGuess} guessedLetters={guessedLetters}/>
      <div style={{alignSelf: "stretch"}}>
        <Keyboard activeLetter={guessedLetters.filter(letter => wordToGuess.includes(letter))} inactiveLetters={incorrectLetters} addGuessedLetter={addGuessedLetter}/>
      </div>
      
    </div>
  )
}

export default App
