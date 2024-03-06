import { useState } from 'react'
import words from "./wordList.json"

import {HangmanDrawing} from "./Hangmandrawing"
import { HangmanWord } from './HangmanWord'
import { Keyboard } from './Keyboard'


function App() {

  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })
  
  //explicity defining a type for useState
  //Ex: useState<string>('') or useState<number>(0)
  //In this Example: useState <string[]>([])
  //An array of strings
  const [guessedLetters, setGuessedLetters] = useState <string[]>([])
  console.log(wordToGuess)

  const incorrectLetters = guessedLetters.filter(letter => {
    !wordToGuess.includes(letter)
  })

  console.log(incorrectLetters)

  return (
    <div style={{maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem', margin: 'auto', alignItems: 'center'}}>
      <div style={{fontSize: '2rem', textAlign: 'center'}}>Lose Win</div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanWord/>
      <div style={{alignSelf: "stretch"}}>
        <Keyboard />
      </div>
      
    </div>
  )
}

export default App
