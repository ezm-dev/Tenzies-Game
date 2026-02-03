export default function Die(props) {
    const style={
        backgroundColor: props.isHeld?"#59E391":"white"
    }
    return (
        <button 
        style={style} 
        aria-label={`Die value is ${props.value}, ${props.isHeld ? 'held' : 'not held'}`}
        aria-pressed={props.isHeld}
        onClick={()=>props.hold(props.id)}>
        {props.value}</button>
    )
    }