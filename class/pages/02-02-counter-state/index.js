import { useState } from 'react'

export default function CounterStatePage(){
    const [count, setCount] = useState(0)
    // let count = 10

    function counter(){
        // count = count + 1
        // console.log(count)
        setCount(count + 1)

        setCount(2)

        setCount(3)

        setCount(4)

        setCount(5)
    }

    // function counter(){
    //     setCount(count - 1)
    // }

    return (
        <div>
            <div>{count}</div>
            <button onClick={counter}>카운트 올리기!!!</button>
        </div>
    )
}