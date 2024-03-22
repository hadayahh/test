import { useState, useEffect} from 'react'
import words from "./wordList.json"

import {HangmanDrawing} from "./Hangmandrawing"
import { HangmanWord } from './HangmanWord'
import { Keyboard } from './Keyboard'

import './App.css';

import swal from 'sweetalert';



function share() {
  let url = document.location.href;
  const cb = navigator.clipboard;
  cb.writeText(url).then(() => {
    swal('URL has been copied!')
  })

}
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
    
    <div style={{maxWidth: '1100px', display: 'flex', flexDirection: 'column', gap: '2rem', margin: 'auto', alignItems: 'center'}}>
      <h1 style={{fontSize: "3rem"}}>Things you should consider</h1>
      <ul style={{fontSize: '25px'}}>
        <li>The objective of hangman is to guess the secret word before the stick figure is hung.</li>
        <li>Players take turns selecting letters to narrow the word down, you may choose to play solo as well.</li>
        <li>Gameplay continues until the players guess the word or they run out of guesses and the stick figure is hung.</li>
        <li>Feel free to refresh the browser should you want to tackle a shorter word in length.</li>
      </ul>
      {/* <h1>Rules to consider</h1>
      <ul style={{fontSize: '25px'}}>
        <li>The object of hangman is to guess the secret word before the stick figure is hung. Players take turns selecting letters to narrow the word down.</li>
        <li>Players can take turns or work together. Gameplay continues until the players guess the word or they run out of guesses and the stick figure is hung.</li>
        <li>If you want to play with younger kids, use a snowman instead of a hangman to avoid scaring or offending anyone.</li>
      </ul> */}
      {/* integrate swal alert for winner and loser instead */}
      <h3 style={{fontSize: "3rem"}}>Have at it!</h3>
      <div style={{fontSize: '3rem', textAlign: 'center', fontFamily: "sans-serif", color: 'black'}}>{isWinner && 'Winner! - Refresh to try again.'} {isLoser && 'Nice Try! - Refresh to try again.'}</div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanWord reveal={isLoser} wordToGuess={wordToGuess} guessedLetters={guessedLetters}/>
      <div style={{alignSelf: "stretch"}}>
        <Keyboard disabled={isWinner || isLoser} activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))} inactiveLetters={incorrectLetters} addGuessedLetter={addGuessedLetter}/>
      </div>
      <button id= 'button' onClick={() => share()}>Share with friends!</button>
    </div>
  )
}

export default App
