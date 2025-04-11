import classes from './TrainingPlanSection.module.css'
import useLocalStorage from '../../../hooks/useLocalStorage/useLocalStorage'
import data from './../data'
import { useState } from 'react'




const TrainingPlanSection = ({selectedPlan, setSelectedPlan}) => {
    const handleSelectPlan = (key) => {
        setSelectedPlan(key)
    }
    const [value, localValue] = useLocalStorage('plans', '')

    if (!value()) localValue(JSON.stringify(data))

    const [plans, setPlans] = useState(Object.values(JSON.parse(value())))
    localValue(JSON.stringify(plans))
    return (
        <div className={classes.container}>
            {plans.map((trainingPlan, key)=> {
                console.log(trainingPlan[0][0])
                
                return (
                    <div onClick={()=>handleSelectPlan(key)} key={key} className={classes.trainingPlanButtonContainer}> 
                        <button className={classes.trainingPlanButtonButton}> {trainingPlan[0][0]} </button>
                    </div>
                )
            })}

            
        </div>
    )
}

export default TrainingPlanSection