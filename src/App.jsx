import Die from "./Die"
import { useRef, useState } from "react"
import { nanoid } from "nanoid"
import ConfettiWrapper from "./ConfettiWrapper"
import { useEffect } from "react"


export default function App() {
  const [dice, setDice] = useState(generatDiceNumbers())
  const newGameBtn= useRef(null)
  


  //drive state based on the sate of dice & it is calculated every render ( by setDice)
  const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)
    useEffect(()=>{
    if(gameWon){
      newGameBtn.current.focus()
    }
}, [gameWon])

  function hold(id) {
    setDice(prev => {
      return prev.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die

        // if(die.id ===id){
        //     return({...die, isHeld:!die.isHeld})
        // }
        // else{
        //     return die
        // }
      }

      )
    })
  }

  function generatDiceNumbers() {
    return new Array(10)
      .fill(0)
      .map(() =>
      ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
  }
  function roll() {
        if(gameWon){
             setDice(generatDiceNumbers())
        }
        else{
    setDice(prev => prev.map((die) =>
      die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }

    ))
  }
  }

    // Another method
    //   function generateAllNewDice(){
    //     const arr=[]
    //     for( let i=0; i<10 ; i++){
    //         const num = Math.floor(Math.random()*6)+1
    //         arr.push(num)
    //     }
    //     return arr
    // }

  const diceElements = dice.map((die, index) =>
    <Die
      value={die.value}
      isHeld={die.isHeld}
      hold={hold}
      key={die.id}
      id={die.id}
    />)

  return (
    <main>
      {gameWon && <ConfettiWrapper />}
      <div aria-live="polite" className="sr-only">
        {gameWon ? "Congratulations! You won!" : "Roll the dice to continue"}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    
      <div className="container">
        {diceElements}
      </div>

      <button className="roll-dice" ref={newGameBtn} onClick={roll}>{gameWon?"New Game":"Roll"}</button>
    </main>
  )
}