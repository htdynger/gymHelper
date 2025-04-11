// import HubButton from "../HubButton/HubButton"
import classes from './Settings.module.css'
import Header from "../Header/Header"
import useLocalStorage from "../../../hooks/useLocalStorage/useLocalStorage"
import TrainingPlan from "../TrainingPlan/TrainingPlan"
import convertToTime from "../converToTimeFunction"
import data from '../data'
import { useState } from "react"
const Setting = () => {
    
    const [value, localValue] = useLocalStorage('plans', '')

    if (!value()) localValue(JSON.stringify(data))

    const [plans, setPlans] = useState(JSON.parse(value()))
    

    const [restTime, localRestTime] = useLocalStorage('restTime', '300')
    const [time, setTime] = useState(restTime())
    const mutate = (value) => {
        if ((time < 1 && value < 0) || (time > 581 && value > 0) ) return
        localRestTime(value + Number(restTime()))
        setTime(restTime())
        
    }
    
    
    return (
        <div className={classes.settings}>
            <div>
                <Header> Время между подходами </Header>
                <div className={classes.mutateTimeContainer}> 
                    <button className={classes.mutateTimeButton} onClick={()=>mutate(-20)}> - </button>
                        {convertToTime(time)}
                    <button className={classes.mutateTimeButton} onClick={()=>mutate(20)}> + </button>
                </div>
            </div>
            

            <div> 
                <Header> Тренировочный план</Header>
                <TrainingPlan setPlans={setPlans} plans={Object.values(plans)}> </TrainingPlan>
                
            </div>
            
        </div>
    )
}
export default Setting