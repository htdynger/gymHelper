import { useState, useEffect} from "react"
import deleteIconURL from '../icon/deleteIcon.png'
import addIconURL from '../icon/addIcon.png'
import classes from './TrainingPlan.module.css'
import useLocalStorage from "../../../hooks/useLocalStorage/useLocalStorage"

const TrainingPlan = ({ plans, setPlans }) => {
    const [value, localValue] = useLocalStorage('plans')
    useEffect(()=>{
        console.log(plans)
        localValue(JSON.stringify(plans))
    }, [plans])

    const [selectedPlan, setSelectedPlan] = useState(0)
    
    const handleClick = (bool, plan) => {
        
        setIsVisible(bool)
        setSelectedPlan(plan)
        
        // bool && localValue(JSON.stringify(plans))
    }

    const addPlan = () => {
        setPlans((prev) => {
            const lastIndex = Object.keys(prev).length;
        
            return {
                ...prev,
                [lastIndex]: {
                    0: {
                        0: "Новый план",
                        1: {
                            0: "Название дня",
                            1: [lastIndex, 1, 0],
                        },
                    },
                    1: {
                        0: "das",
                        1: "ВФЫ ВФЫ ВФЫ",
                        2: "Жим гантелей лёжа на скамье под углом 45 градусов",
                        3: "Бабочка",
                    },
                },
            };
        });
        
        
    }

    const addMuscle = (plan) => {

        setPlans((prev) => {
            const updatedPlan = { ...prev[plan] };
    
            const lastIndex = Object.keys(updatedPlan).length;
            updatedPlan[lastIndex] = { 0: " Мышца", 1: " Упражнение" };
    
            return {
                ...prev,
                [plan]: updatedPlan,
            };
        });
    };
    

    const addExercise = (plan, muscle) => {
        setPlans((prev) => {
            // Создаем копию текущего плана
            const updatedPlan = { ...prev[plan] };
    
            // Создаем копию текущей мышечной группы
            const updatedMuscle = { ...updatedPlan[muscle] };
    
            // Вычисляем следующий индекс для нового упражнения
            const lastIndex = Object.keys(updatedMuscle).length;
    
            // Добавляем новое упражнение
            updatedMuscle[lastIndex] = "новое упражнение";
    
            // Обновляем мышечную группу в плане
            updatedPlan[muscle] = updatedMuscle;
    
            // Обновляем общий список планов
            return {
                ...prev,
                [plan]: updatedPlan,
            };
        });
    };
    
    
    const fixIndex = (data) => {
        const newObject = {};
        let index = 0;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                newObject[index] = data[key]; // Присваиваем значения с новыми индексами
                index++;
            }
        }
        return newObject;
    };

    const addDay = (plan) => {
        
        setPlans((prev) => {
            
            const initialState = JSON.parse(JSON.stringify(prev));
            const lastIndex = Object.keys(initialState[plan][0]).length;
            
            initialState[plan][0][lastIndex] = {0: 'Новая тренировка'}
            return initialState
        });

    }
    

    const handleDelete = (plan, muscle, exercise, trainingDay, removeFullDay) => {
        setPlans((prev) => {
            // Создаем глубокую копию данных, чтобы избежать мутаций
            const updatedPlans = JSON.parse(JSON.stringify(prev));

            if (plan != null && muscle === null && exercise === null && trainingDay != null && removeFullDay === false) {
                const updatedDay = { ...updatedPlans[plan][0] }
                const lastIndex = Object.keys(updatedDay[trainingDay]).length-1
                if (lastIndex === 0) return updatedPlans
                delete updatedDay[trainingDay][lastIndex]
                // delete updatedDay[trainingDay][Object.keys(updatedDay[trainingDay]).length-1]
                console.log(Object.keys(updatedDay[trainingDay]).length)
                updatedPlans[plan][0] = updatedDay
                return updatedPlans
            }
            
            if (plan != null && muscle === null && exercise === null && trainingDay != null && removeFullDay === true) {
                console.log('udalili', trainingDay)
                const updatedDay = { ...updatedPlans[plan][0] }
                delete updatedDay[trainingDay]
                // updatedPlans[plan][0] = updatedDay
                updatedPlans[plan][0] = fixIndex(updatedDay)
                return updatedPlans
            }
            


            if (plan != null && muscle != null && exercise != null) {
                // Удаляем упражнение
                const updatedMuscle = { ...updatedPlans[plan][muscle] };
                delete updatedMuscle[exercise];
                updatedPlans[plan][muscle] = fixIndex(updatedMuscle); // Переиндексируем оставшиеся упражнения
    
                return updatedPlans;
            }
    
            if (plan != null && muscle != null) {
                // Удаляем мышечную группу
                const updatedPlan = { ...updatedPlans[plan] };
                delete updatedPlan[muscle];
                updatedPlans[plan] = fixIndex(updatedPlan); // Переиндексируем оставшиеся мышечные группы
    
                return updatedPlans;
            }
    
            if (plan != null) {
                // Удаляем весь план
                delete updatedPlans[plan];
                return fixIndex(updatedPlans); // Переиндексируем оставшиеся планы
            }
    
            return updatedPlans; // Возвращаем обновленное состояние
        });
    };
    
    

    const [isVisible, setIsVisible] = useState(true)
    

    const [selects, setSelects] = useState([[""]])

    const handleChange = (index, value, dayIndex, indexPlan) => {
        const updatedSelects = [...selects]; // Копируем текущий массив
        updatedSelects[index] = value; // Обновляем значение в нужном select
        setSelects(updatedSelects);
        setSelected(value)
        console.log(value)
        setPlans((prev)=> {
            const newState = {...prev}
            newState[indexPlan][0][dayIndex][index] = [indexPlan, Number(value), 0]

            return newState
        })
        
    };

    const [selected, setSelected] = useState(null)

    const addMuscleSelect = (indexPlan, dayIndex) => {
        setPlans((prev) => {
            // Копируем план для указанного индекса
            const updatedPlan = { ...prev[indexPlan] };
    
            // Копируем дни в плане
            const updatedDays = { ...updatedPlan[0] };
    
            // Копируем упражнения для указанного дня
            const updatedDay = { ...updatedDays[dayIndex] };
    
            // Определяем последний индекс
            const lastIndex = Object.keys(updatedDay).length;
    
            // Добавляем новое упражнение
            updatedDay[lastIndex] = [indexPlan, 1, 0];
    
            // Обновляем день в плане
            updatedDays[dayIndex] = updatedDay;
    
            // Обновляем 0-й уровень в плане
            updatedPlan[0] = updatedDays;
    
            // Возвращаем обновлённое состояние
            return {
                ...prev,
                [indexPlan]: updatedPlan,
            };
        });
    };
    
    return (
        <>
            
            {Array.isArray(plans) ? plans.map((e, index0) => {

                return (

                    <div className={classes.main} key={index0}> 
                    
                        {isVisible ? (
                            <div className={classes.namePlansContainer}> 
                                <button onClick={()=>handleClick(false, index0)} className={classes.buttonTrainingPlan}> {e[0][0]} </button>

                                <img alt="Удалить" onClick={() => handleDelete(index0)} className={classes.deletePlanButton} src={deleteIconURL} />
                            </div>
                        ) : (
                            <>
                                {index0 === selectedPlan && (
                                    <>
                                        <div className={classes.container}> 

                                            <textarea 
                                                className={classes.nameMuscle}
                                                value={plans[index0][0][0]}
                                                onChange={(e) => {
                                                    setPlans((prev) => ({
                                                        ...prev,
                                                        [index0]: {
                                                            ...prev[index0],
                                                            0: {
                                                                ...prev[index0][0],
                                                                0: e.target.value
                                                            }
                                                        }
                                                    }))
                                                }}
                                            />
                                        </div>
                                        <div onClick={()=>handleClick(true, index0)} className={classes.container}> 
                                            <button style={{"backgroundColor": "#defe", "border": "none", "fontWeight": "700", "fontSize": "18px"
                                            }}> Назад </button>
                                        </div>
                                    
                                        <div className={classes.sectionHeader}> 
                                            Упражнения
                                        </div>

                                        {Object.values(e).map((value, index1) => {
                                            if (!plans[index0][index1]) return null
                                            return (
                                                index1 > 0 && plans[index0][index1][0] ? 
                                                (
                                                    <div className={classes.container} key={index1}>

                                                        <div className={classes.nameMuscleContainer}> 
                                                        
                                                            <textarea 
                                                                className={classes.nameMuscle} 
                                                                onChange={(e) => {
                                                                    let value = e.target.value

                                                                    if (!value.startsWith(' ')) {
                                                                        value = ' ' + value.trim()
                                                                    }

                                                                    setPlans((prev) => ({
                                                                        ...prev,
                                                                        [index0]: {
                                                                            ...prev[index0],
                                                                            [index1]: {
                                                                                ...prev[index0][index1],
                                                                                
                                                                                0: value
                                                                            }
                                                                        }
                                                                    }));
                                                                }}
                                                                value={plans[index0][index1][0]}
                                                            />
                                                            <img alt="Удалить" onClick={() => handleDelete(index0, index1)} className={classes.deleteButton} src={deleteIconURL} />
                                                        </div>

                                                        <div>
                                                
                                                            {index1 > 0 && Object.values(value).map((item, index2) => {
                                                                if (!plans[index0][index1][index2]) return null;
                                                                return (
                                                                    <span key={index2}>
                                                            
                                                                        {index2 > 0 && (
                                                                            
                                                                            <div className={classes.inputExercisesContainer}> 
                                                                                <textarea
                                                                                    className={classes.inputExercises}
                                                                                    onChange={(e) => {
                                                                                        let value = e.target.value

                                                                                        if (!value.startsWith(' ')) {
                                                                                            value = ' ' + value.trim()
                                                                                        }
                                                                                        setPlans((prev) => ({
                                                                                            ...prev,
                                                                                            [index0]: {
                                                                                                ...prev[index0],
                                                                                                [index1]: {
                                                                                                    ...prev[index0][index1],
                                                                                                    [index2]: value
                                                                                                }
                                                                                            }
                                                                                        }));
                                                                                    }}
                                                                                    value={plans[index0][index1][index2]}
                                                                                />

                                                                                <img alt="Удалить" onClick={() => handleDelete(index0, index1, index2)} className={classes.deleteButton} src={deleteIconURL} />
                                                                            </div>
                                                                    )} 
                                                            
                                                                    
                                                        
                                                                </span>
                                                                )
                                                            }
                                                    
                                                                    
                                                            )}



                                                            {index1 > 0 && (
                                                                <div className={classes.addExerciseContainer} onClick={()=>addExercise(index0, index1)}>
                                                                    
                                                                    <button className={classes.buttonAddExercise}> Добавить упражнение </button>
                                                                    <img alt="Добавить" className={classes.deleteButton} src={addIconURL} />

                                                                </div>
                                                            )}
                                                            
                                                        </div>


                                                    </div>


                                                ) : null 

                                            )
                                        })}
                                
                                        <div onClick={()=>addMuscle(index0)} className={classes.addPlanContainer}> 
                                            <button className={classes.buttonTrainingPlan}> Добавить мышцу </button>
                                            <img alt="Добавить" className={classes.deletePlanButton} src={addIconURL} />
                                        </div>

                                        <hr />
                                        <div className={classes.sectionHeader}> 
                                            Тренировочные дни
                                        </div>

                                        {Object.values(plans[index0][0]).map((value, dayIndex) => {
                                            if (!dayIndex) return null
                                            return (
                                                <> 


                                                    



                                                    <div className={classes.containerDays}> 
                                                        
                                                    <div className={classes.nameMuscleContainer}> 
                                                        {plans?.[index0]?.[0]?.[dayIndex]?.[0] !== undefined && (
                                                            <textarea 
                                                                className={classes.nameMuscle} 
                                                                onChange={(e) => {
                                                                    setPlans((prev) => {
                                                                        // Проверяем, есть ли prev (вообще существует ли состояние)
                                                                        if (!prev) return {};

                                                                        // Делаем копию предыдущего состояния
                                                                        const newPlans = JSON.parse(JSON.stringify(prev));

                                                                        // Гарантируем, что `index0` существует
                                                                        if (!newPlans[index0]) newPlans[index0] = [{}];

                                                                        // Гарантируем, что `newPlans[index0][0]` существует
                                                                        if (!newPlans[index0][0]) newPlans[index0][0] = {};

                                                                        // Гарантируем, что `newPlans[index0][0][dayIndex]` существует
                                                                        if (!newPlans[index0][0][dayIndex]) newPlans[index0][0][dayIndex] = {};

                                                                        // Обновляем значение
                                                                        newPlans[index0][0][dayIndex][0] = e.target.value;

                                                                        return newPlans;
                                                                    });
                                                                }}
                                                                value={plans?.[index0]?.[0]?.[dayIndex]?.[0] || ""}
                                                            />
                                                        )}

                                                        <img 
                                                            alt="Удалить" 
                                                            onClick={() => handleDelete(index0, null, null, dayIndex, true)} 
                                                            className={classes.deleteButton} 
                                                            src={deleteIconURL} 
                                                        />
                                                    </div>


                                                        
                                                        <br></br>
                                                        
                                                        
                                                        
                                                        
                                                            {Object.values(plans[index0][0][dayIndex]).map((value, indexSelect) => {
                                                                if (!indexSelect) return null
                                                                return (
                                                                    <div key={indexSelect} className={classes.selectMuscleContainer}>
                                                                        
                                                                        <select defaultValue={plans[index0][0][dayIndex][indexSelect][1]} className={classes.select} value={null} onChange={(e) => handleChange(indexSelect, e.target.value, dayIndex, index0)}> 
                                                                            
                                                                            
                                                                            {Object.values(plans[index0]).map((value, index) => {
                                                                                if (!index) return null
                                                                                
                                                                                return (
                                                                                    <option value={index}> 
                                                                                        
                                                                                        {selected === index ? (
                                                                                            <> {plans[plans[index0][0][dayIndex][indexSelect][0]][plans[index0][0][dayIndex][indexSelect][1]][plans[index0][0][dayIndex][indexSelect][2]]} </>
                                                                                        ) : (
                                                                                            <> {plans[index0][index][0]} </>
                                                                                        )} 
                                                                                    </option>
                                                                                )
                                                                            })}
                                                                        </select>

                                                                       
                                                                        {/* <img alt="Удалить" onClick={()=>handleDelete(index0, null, null, dayIndex, indexSelect)} className={classes.deleteButton} src={deleteIconURL} /> */}
                                                                    </div>
                                                                )
                                                            })}
                                                        
                                                        <br></br>
                                                        <br></br>

                                                        <div onClick={()=> handleDelete(index0, null, null, dayIndex, false)} className={classes.buttonAddSelectContainer}> 
                                                            <button className={classes.buttonAddSelect}> Удалить мышцу </button>
                                                            <img alt="Добавить" className={classes.deletePlanButton} src={deleteIconURL} />
                                                        </div>

                                                        <br></br>

                                                        <div onClick={() => addMuscleSelect(index0, dayIndex)} className={classes.buttonAddSelectContainer}> 
                                                            <button className={classes.buttonAddSelect}> Добавить мышцу </button>
                                                            <img alt="Добавить" className={classes.deletePlanButton} src={addIconURL} />
                                                        </div>

                                                            
                                                    </div>

                                                    
                                                </>
                                                
                                            )
                                        })}
                                        <div onClick={()=>addDay(index0)} className={classes.addPlanContainer}> 
                                            <button className={classes.buttonTrainingPlan}> Добавить тренировку </button>
                                            <img alt="Добавить" className={classes.deletePlanButton} src={addIconURL} />
                                        </div>
                                        
                                    </>
                                )}

                                
                            </>
                        )}
                        
                        

                    </div>
                )
                
            }) : ( <>asd </>)}

            { isVisible && <div className={classes.namePlansContainer}> 
                 
                    <button onClick={()=>{addPlan()}} className={classes.buttonTrainingPlan}> Добавить план </button>
                    <img alt="Добавить" className={classes.deletePlanButton} src={addIconURL} />
                
                
            </div> }
        </>
    )
}
export default TrainingPlan