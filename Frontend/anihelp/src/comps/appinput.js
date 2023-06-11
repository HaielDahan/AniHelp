import { useRef, useState } from "react"

export default function Appinput(props){
    let color = useRef();
    let selectcolor = useRef();

    let [bg, setBg] = useState("")
    let [fontcolor, SetFontColor] = useState("black")
    
    
    const changeColor=()=>{
        setBg(color.current.value)
    }
    {/*style={{background: bg}}*/}
    return (
       <div className="col-lg border p-3">
        {/* <h2>Enter your favorite color:{bg}</h2>
        <input ref={color} type="text" className="form-control"/>
        <button onClick={changeColor} className="btn btn-info mt-3">change color</button>
        <hr/> */}
        
        <h3 style={{color: fontcolor}}>Choose front color:</h3>
        {/*if i want to change the select option i need to use at SetFontColor(selectcolor.current.value)*/}
        <select onChange={()=>{props.changeColor(selectcolor.current.value)}} 
        ref = {selectcolor} className="form-select">
            <option value="blue">blue</option>
            <option value="green">green</option>
            <option value="red">red</option>
        </select>
       </div>
    )
}

{/*function App(){
  let [bgcolor, setBgColor]=useState("blue")
  const changeColor=(val)=>{
    setBgColor(val)
  }
  return (
       <div style={{background:bgcolor}} className="container">
      <h3>Hellow</h3>
      <Appinput changeColor = {changeColor}/>
      </div>
    );
} */}