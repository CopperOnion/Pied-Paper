import React , { useState} from 'react'
import Navbar from "../nav/navbar"

function Main() {
    const [count,  setCount] = useState(0)

    const increment = () => {
      setCount(count + 1);
    }
    return (
        <div>
                <Navbar/>
                Update : Our page will be called Pied paper
                Simple counter - 

                Ooga booba { count }

                <button onClick= {increment}> Increment </button>
        </div>
    )
}

export default Main
