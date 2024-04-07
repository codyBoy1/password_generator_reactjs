import { useState ,useCallback,useEffect,useRef} from 'react'

function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed ,setNumberAllowed] =useState(true)
  const [characterAllowed ,setCharacterAllowed] =useState(false)
  const [password,setPassword] =useState()
  // useRef hook
  const passwordRef = useRef(null)
  
  
  
  const passwordGenerator = useCallback(()=>{
    let pass =""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(characterAllowed) str+="@#&$¢£€_"
    
    for(let i=1;i<=length;i++){
      let char =Math.floor(Math.random()*str.length+1)
      pass+= str.charAt(char)
      //console.log(pass)
      //console.log(str.length)
    }
    
  setPassword(pass)
  },[length,numberAllowed,characterAllowed,setPassword])

const passwordCopytoclipboard = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,15)
  window.navigator.clipboard.writeText(password)
},[password])
  //can't call directly
//passwordGenerator()
useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,characterAllowed,setPassword,passwordGenerator])
  return (
    <>
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg text-orange-500 px-4 py-3 my-8 bg-gray-700">
     
     <h1 className="my-3 text-white text-center">Password Generator </h1>
     
     
     <div className="flex shadow rounded-lg overflow-hidden mb-4">
     
      <input 
      type="text"
      value={password}
      className="outline-none w-full px-3 py-1" 
      placeholder="password"
      readOnly
      ref={passwordRef}
      />
      
      <button 
      onClick={passwordCopytoclipboard}
      className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy!</button>
      
      </div>
      
      
      <div className="flex text-sm gap-x-2">
      
      
      <div className="flex items-center gap-x-1">
      <input
     type="range"
     min={8}
     max={14}
     value={length}
     className="cursor-pointer"
     onChange={(e)=>{setLength(
     e.target.value
     )}}
      />
      <label>length:{length}</label>
      </div>
      
      <div className="flex items-center gap-x-1">
      <input
      type="checkbox"
      defaultChecked={numberAllowed}
      id="numberInput"
      onChange={()=>{setNumberAllowed((prev)=>!prev);
      }}
      />
      <label htmlfor ="numberInput">Number</label>
      </div>
      
      <div className="flex items-center gap-x-1">
      <input
      type="checkbox"
      defaultChecked={characterAllowed}
      id="characterInput"
      onChange={()=>{setCharacterAllowed((prev)=>!prev);
      }}
      />
      <label htmlfor ="characterInput">character</label>
      </div>
      
      </div>
      
      
      </div>
    </>
  )
}

export default App
