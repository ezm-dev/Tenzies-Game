import Confetti from 'react-confetti'

export default function ConfettiWrapper() {
  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
 
    />
  )
}