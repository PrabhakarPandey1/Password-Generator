import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [allowNum, setNumber] = useState(false);
  const [allowChar, setCharacter] = useState(false);

  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null)



  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (allowNum) {
      str += "0123456789"
    }
    if (allowChar) {
      str += "!@#$%^&*()_+-={}[]|\:;<>,.?/"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }
    setPassword(pass);

  }, [length, allowNum, allowChar, setPassword])

  //useEffect hook
  useEffect(() => { passwordGenerator() }, [length, allowNum, allowChar, passwordGenerator])

  //To copy password 
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className='h-auto min-h-screen m-auto   bg-gray-600 pb-2 flex justify-center items-center flex-col'>

        <div className='w-full h-[300px] text-fuchsia-600 bg-gray-400 max-w-lg mx-auto shadow-md rounded-md px-5 my-5 pb-5 '>
        <h2 className='w-full text-center font-bold tracking-[5px] uppercase text-black bg-gray-400 max-w-md mx-auto  rounded-md px-2 my-5'>Password Generator</h2>
          <div className='flex shadow rounded-lg gap-1 mt-2 overflow-hidden mb-2'>

            <input type="text" value={password}
              className='outline-none w-full py-2 px-2 bg-blue-200 pb-2' placeholder='Password' readOnly 
              ref={passwordRef} />

            <button onClick={copyPasswordToClipboard} className='w-15 ml-1 bg-cyan-500 text-white hover:text-black hover:bg-fuchsia-600'>Copy</button>
          </div>

          <div className='flex flex-wrap text-sm gap-x-5 mt-7 '>
            <div className='flex flex-wrap items-center gap-x-1'>
              <input type="range"
                min={6}
                max={50} value={length} className='cursor-pointer'
                onChange={(e) => { setLength(e.target.value) }} />
              <label >Length:{length}</label>
            </div>
            <div className='flex item-center gap-x-1'>
              <input type="checkbox" defaultChecked={allowNum} id="numberInput"
                onChange={() => {
                  setNumber((prev) => !prev);
                }} />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className='flex item-center gap-x-1'>
              <input type="checkbox" defaultChecked={allowNum} id="charInput"
                onChange={() => {
                  setCharacter((prev) => !prev);
                }} />
              <label htmlFor="charInput">Characters</label>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
