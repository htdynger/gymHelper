import { useEffect } from "react";
import convertToTime from "../converToTimeFunction";
const RestTimer = ({ time, setTime}) => {


    useEffect(() => {
    
        const timerId = setInterval(()=> {
          setTime((prev) => prev-1)
        }, 1000)
    
        return () => {clearInterval(timerId)}

      }, [setTime]) // таймер

    return (
    
        <h3>{convertToTime(time)}</h3>
    
    )
}

export default RestTimer