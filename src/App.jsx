import { useCallback, useEffect, useState , useRef} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // step 1: variables - collect
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPass] = useState("");

  // useRef hook
  const passwordRef =useRef(null); // we can take any elemnt's reference and make manipulations with it and we have to pass reference
  // useCallback hook- step 2 - password generator 
  // optimised using usecallback - memorize function partally or completely .. [dependencies] 
  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (numAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()_-+={}[]:,./<>?";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); // gives index
      pass += str.charAt(char);
    }
    setPass(pass);
  }, [length, numAllowed, charAllowed, setPass]);
  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select(); // this is only for the ui to look good when copy button is clicked so that user get informed which text is being copued
    // passwordRef.current?.setSelectionRange(0,3);   it is not needed here but we should know about this... saara select nhi kuch particular range select karta hai
    window.navigator.clipboard.writeText(password)
  },[password])

  //useEffect hook - when page gets loaded then it is called and whenever anything in the dependencies array gets changed then also it is called
  useEffect(()=>passwordGenerator,[length, numAllowed, charAllowed, passwordGenerator]);
  return (
    < div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500 ">

        <h1 className="text-white text-center my-3">Password generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-amber-50 hover:cursor-default"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0
          transition duration-300 transform hover:scale-105 hover:bg-blue-500 active:scale-95 hover:cursor-pointer">copy</button>
        </div>

        <div className="flex text-sm gap-x-4 items-center justify-center">
          <div className="flex items-center gap-x-2">
            <input type="range" min={6} max={20} id="rangeInp" value={length} className="cursor-pointer" onChange={(e)=>setLength(e.target.value)}/>
            <label htmlFor="rangeInp" >Length: {length} </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input type="checkbox" id="NumberInput" defaultChecked={numAllowed} onChange={()=>setNumAllowed((prev) => !prev)} className="hover:cursor-pointer"/>
            <label htmlFor="NumberInput" className="hover:cursor-pointer"> Numbers </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input type="checkbox" id="charInput" defaultChecked={charAllowed} onChange={()=>setCharAllowed((prev) => !prev)} className="hover:cursor-pointer"/>
            <label htmlFor="charInput" className="hover:cursor-pointer"> Characters </label>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
