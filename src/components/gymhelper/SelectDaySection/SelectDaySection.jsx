import { useState } from "react"
import useLocalStorage from "../../../hooks/useLocalStorage/useLocalStorage"
import data from './../data'
import classes from './SelectDaySection.module.css'

const SelectDaySection = ({selectedDay, setSelectedDay, selectedPlan}) => {

    const [value, localValue] = useLocalStorage('plans', '')

    if (!value()) localValue(JSON.stringify(data))

    const [plans, setPlans] = useState(Object.values(JSON.parse(value())))

    return (
        <div className={classes.container}>
            {Object.keys(plans[selectedPlan][0]).map((day, key)=> {
                console.log(day[0][0])
                if (day == 0) return
                return (
                    <div key={key} onClick={()=>setSelectedDay(day)} className={classes.trainingPlanButtonContainer}> 
                        <button className={classes.trainingPlanButtonButton}> {plans[selectedPlan][0][day][0]} </button>
                        
                    </div>
                )
            })}

            
        </div>
    )
}

export default SelectDaySection