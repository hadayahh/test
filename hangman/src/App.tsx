import { useState } from 'react'
import words from "./wordList.json"

import {HangmanDrawing} from "./Hangmandrawing"
import { HangmanWord } from './HangmanWord'
import { Keyboard } from './Keyboard'


function App() {

  const [wordToGuess, setWordToGuess] = useState(() => {
    return 'test'
    return words[Math.floor(Math.random() * words.length)]
  })
  
  const [guessedLetters, setGuessedLetters] = useState <string[]>(["t","e"])
  //explicity defining a type for useState
  //Ex: useState<string>('') or useState<number>(0)
  //In this Example: useState <string[]>([])
  //An array of strings

  console.log(wordToGuess);
  console.log(guessedLetters);

  const incorrectLetters = guessedLetters.filter(letter => {
    !wordToGuess.includes(letter)
  })

  return (
    <div style={{maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem', margin: 'auto', alignItems: 'center'}}>
      <div style={{fontSize: '2rem', textAlign: 'center'}}>Lose Win</div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanWord wordToGuess={wordToGuess} guessedLetters={guessedLetters}/>
      <div style={{alignSelf: "stretch"}}>
        <Keyboard />
      </div>
      
    </div>
  )
}

export default App
