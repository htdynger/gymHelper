import useLocalStorage from "../../../hooks/useLocalStorage/useLocalStorage";
import { useState, useEffect } from "react";
import classes from './Record.module.css'
import data from "../data";
import Header from './../Header/Header'
import deleteIconURL from '../icon/deleteIcon.png'
const Record = () => {

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, []);


    // const [gymData, localGymData] = useLocalStorage("recordData", JSON.stringify({
    //     0: {
    //         0: '2021',
    //         1: '0',
    //         2: '3',
    //         3: {"0":["312","312312","123"],"1":["3213211","32131231"],"2":["322211","321312"],"3":["323232","33333"],"4":["11111","121212"]}
    //     },
    //     // 1: {
    //     //     0: 'Д1ата',
    //     //     1: 'Тр1енировочный план',
    //     //     2: 'На1звание тренировки',
    //     //     3: 'Наз1вание упражнения, и подходы'
    //     // },
    //     // 2: {
    //     //     0: 'Дат2а',
    //     //     1: 'Тр2енировочный план',
    //     //     2: 'На2звание тренировки',
    //     //     3: 'Наз2вание упражнения, и подходы'
    //     // },
    //     // 3: {
    //     //     0: 'Дат3а',
    //     //     1: 'Трен3ировочный план',
    //     //     2: 'Назв3ание тренировки',
    //     //     3: 'Назв3ание упражнения, и подходы'
    //     // }
    // }));

    const [gymData, localGymData] = useLocalStorage("recordData", '')

    const [value, localValue] = useLocalStorage('plans', '')

    if (!value()) localValue(JSON.stringify(data))

    const [plans, setPlans] = useState(Object.values(JSON.parse(value())))
    
    const [recordData, setRecordData] = useState(gymData() ? Object.values(JSON.parse(gymData())) : null);

    const deleteData = () => {
        localGymData('')
        document.location.reload()
    }

    return (
        <>
        
        
            {Array.isArray(recordData) ? recordData.map((e, index) => {
                
                
                return (
                    <>
                        
                        <Header> {e[0]} </Header>
                        <div className={classes.container}>

                            <>
                                
                                <div className={classes.containerPlan}> {e[1]} </div>
                            

                                <div className={classes.containerDay}> {e[2]} </div>
                            
                            </>
                            

                        </div>

                            {Array.isArray(Object.values(JSON.parse(e[3]))) && Object.values(JSON.parse(e[3])).map((exercises, index) => {
                                console.log(exercises)
                                return (
                                    <>
                                        <div className={classes.second_container}> 
                                            <div className={classes.second_containerExercises}> {exercises[0]} </div>
                                            
                                            {Array.isArray(exercises) && exercises.map((sets, index) => {
                                                if (index === 0) return
                                                
                                                return (
                                                    <div className={classes.second_containerSets}> 
                                                        {`${index}. Подход: ${sets}`}
                                                    </div>
                                                )
                                            })} 
                                            
                                        </div>
                                    </>
                                )
                            })}

                        
                        
                        
                    </>
                )
            }) : <h1 className={classes.noRecordMessage}> Нет записанных тренировок. </h1>}

            {Array.isArray(recordData) && <div onClick={deleteData} className={classes.containerDeleteData}>
                <button className={classes.buttonDeleteData}> Удалить историю </button>
                <img alt="Удалить историю" className={classes.iconDeleteData} src={deleteIconURL} />
            </div>}
        </>
    )
}

export default Record