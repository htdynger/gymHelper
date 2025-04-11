import { useState, useEffect } from "react";
import RestTimer from "../RestTimer/RestTimer";
import SetsList from "../SetsList/SetsList";
import exercises from "../exercisesName.json";
import HubButton from "../HubButton/HubButton";
import useLocalStorage from "../../../hooks/useLocalStorage/useLocalStorage";
import classes from "./Main.module.css";
import Header from "../Header/Header";
import data from "./../data";
import Finish from "../Finish/Finish";

const ChildMain = ({ selectedDay, selectedPlan, setActiveSection }) => {
    const [value, localValue] = useLocalStorage("plans", "");
    const [plans, setPlans] = useState(Object.values(JSON.parse(value())));
    if (!value()) localValue(JSON.stringify(data));
    
    
    const [sets, setSets] = useState(0)

    const [restTime, localRestTime] = useLocalStorage('restTime', '300')
    const [time, setTime] = useState(restTime())
    
    const [isHaveSets, setIsHaveSets] = useState(true)
    
    const [counterExercise, setCounterExercise] = useState(0);
    const [exerciseSets, setExerciseSets] = useState({});
    const [newSet, setNewSet] = useState("");


    const [gymData, localGymData] = useLocalStorage("recordData", '{}');
    const [recordData, setRecordData] = useState(Object.values(JSON.parse(gymData())));


    const [isVisibleFinish, setIsVisibleFinish] = useState(false)

    
    const handleQuitFunction = () => {
        setRecordData((prev) => {
            const initialState = {...prev}
            const today = new Date() 
            const lastIndex = Object.keys(initialState).length
            initialState[lastIndex] = {
                0: today.toLocaleDateString(),
                1: plans[selectedPlan][0][0],
                2: plans[selectedPlan][0][selectedDay][0],
                3: JSON.stringify(exerciseSets)
            }

            console.log(initialState)
            localGymData(JSON.stringify(initialState))
            
            return initialState

        })
        window.location.reload()
    }

    

    const nextExerciseFunction = () => {
        setCounterExercise((prev) => prev + 1);
        setNewSet("");
        setTime(restTime())
        // console.log(exerciseSets)
        // console.log(`0: ${selectedDay}, 1: ${selectedPlan}, 2: 2025, 3: ${JSON.stringify(exerciseSets)}`)
        if (counterExercise === exerciseList.length-1) {
            
            console.log(recordData)

            setRecordData((prev) => {
                const initialState = {...prev}
                const today = new Date() 
                const lastIndex = Object.keys(initialState).length
                initialState[lastIndex] = {
                    0: today.toLocaleDateString(),
                    1: plans[selectedPlan][0][0],
                    2: plans[selectedPlan][0][selectedDay][0],
                    3: JSON.stringify(exerciseSets)
                }

                console.log(initialState)
                localGymData(JSON.stringify(initialState))
                setIsVisibleFinish(true)
                return initialState

            })

            

            
            setIsVisibleFinish(true)
            
        }
    };

    const addSet = (exerciseIndex) => {
        if (newSet.trim()) {
            setExerciseSets((prev) => {
                const currentExerciseName = exerciseList[exerciseIndex]; // Название упражнения
    
                // Проверяем, есть ли уже записи для этого упражнения
                if (!prev[exerciseIndex]) {
                    return {
                        ...prev,
                        [exerciseIndex]: [currentExerciseName, newSet], // Первым элементом добавляем название упражнения
                    };
                }
    
                return {
                    ...prev,
                    [exerciseIndex]: [...prev[exerciseIndex], newSet], // Добавляем новый сет
                };
            });
            setNewSet("");
            setTime(restTime());
        }
    };
    

    let exerciseList = [];

    const styleButton = {
        "backgroundColor": "#defe",
        "border": "2px, solid, #000",
        "borderLeft": "none",
        "width": "30%",
        "height": "100%",
        "borderTopRightRadius": "10px",
        "borderBottomRightRadius": "10px",
        "fontSize": "12px",
        "fontWeight": "750"
    }


    return (

        <>
            {isVisibleFinish === true && <Finish stats={recordData}> </Finish>}
            <div className={classes.main}>
                <Header>{plans[selectedPlan][0][selectedDay][0]}</Header>

                {Object.values(plans[selectedPlan][0][selectedDay]).map((key, indexMuscle) => {
                    if (indexMuscle === 0) return;
                    return (
                        <>
                            {Object.values(plans[key[0]][key[1]]).map((e, indexExercise) => {
                                if (indexExercise === 0) return;
                                exerciseList.push(e);
                            })}
                        </>
                    );
                })}

                {exerciseList.map((value, indexExerciseList) => {
                    if (indexExerciseList > counterExercise) return null;
                    return (
                        <div key={indexExerciseList}>
                            <Header>{value} </Header>
                            {true && 
                            
                            <SetsList
                                sets={exerciseSets[indexExerciseList] || []}
                                setSets={(newSets) =>
                                    setExerciseSets((prev) => ({
                                        ...prev,
                                        [indexExerciseList]: newSets,
                                    }))
                                }
                            />
                            }
                            
                        </div>
                    );
                })}
                {isHaveSets && <RestTimer time={time} setTime={setTime}></RestTimer>}

                

                <div className={classes.buttonAddExerciseSection}> 
                    <button className={classes.buttonAddExercise} onClick={nextExerciseFunction}> { counterExercise === exerciseList.length-1 ? <> Закончить тренировку </> : <> Следующее упражнение </> } </button>
                    <button onClick={handleQuitFunction} style={styleButton}> Выйти </button>
                </div>

                <div className={classes.inputContainer}>
                    <input
                        className={classes.inputSets}
                        value={newSet}
                        onChange={(e) => setNewSet(e.target.value)}
                        type="text"
                        placeholder="Kg/повторения"
                    />
                    <button onClick={() => addSet(counterExercise)} className={classes.addSetsButton}>
                        Добавить
                    </button>
                </div>
            </div>
        </> 
    );
};

const Main = ({ selectedDay, selectedPlan, setActiveSection }) => {
    return <> {selectedDay && <ChildMain selectedDay={selectedDay} selectedPlan={selectedPlan} setActiveSection={setActiveSection} />} </>;
};

export default Main;
