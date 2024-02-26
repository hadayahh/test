export function HangmanWord(): any {
    const word = "hadi"
    const guessedLetters= ["h"]

    return (
        <div style={{display: "flex", gap: ".25em", fontSize: "6rem", fontWeight: "bold", textTransform: "uppercase", fontFamily: "monospace"}}>{word.split(" ").map((letter, index) => (
           <span>{letter}</span>
        ))}</div>
    )
}