const HEAD = (
    <div style={{height: "50px", width: "50px", borderRadius: "100%", border: "10px solid black", position: "absolute", top:"50px", right: "-30px"}}></div>
)

const BODY = (
    <div style={{background: "black", height: "100px", width: "10px", position: "absolute", top: "115px", right: "0px"}}></div>
)

const RIGHT_ARM = (
    <div style={{background: "black", height: "10px", width: "100px", position: "absolute", top: "150px", right: "-100px", rotate:"-30deg", transformOrigin: "left bottom"}}></div>
)

const LEFT_ARM = (
    <div style={{background: "black", height: "10px", width: "100px", position: "absolute", top: "150px", right: "10px", rotate:"30deg", transformOrigin: "right bottom"}}></div>
)

export function HangmanDrawing(): any{
    return (
    <div style={{position: "relative"}}>
        {HEAD}
        {BODY}
        {RIGHT_ARM}
        {LEFT_ARM}
        <div style={{height: "50px", width: "10px", background: "black", position: "absolute", top: "0", right: "0"}}></div>
        <div style={{height: "10px", width: "200px", background: "black", marginLeft: "120px"}}></div>
        <div style={{height: "400px", width: "10px", marginLeft: "120px", background: "black"}}></div>
        <div style={{height: "10px", width: "270px", background: "black"}}></div>
    </div>
    )
}