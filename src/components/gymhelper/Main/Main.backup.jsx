import RestTimer from "../RestTimer/RestTimer" // импорт таймера ебучего
import SetsList from "../SetsList/SetsList" // импорт тахнологии добавления сетов
import exercises from '../exercisesName.json' // импорт упражнений на ту или инную мышцу
import { useState, useEffect } from "react" // импорт сами знаете чего
import HubButton from "../HubButton/HubButton"
import useLocalStorage from "../../../hooks/useLocalStorage/useLocalStorage"
import classes from './Main.module.css'
import Header from "../Header/Header"
import data from './../data'

const ChildMain = ({ sets, setSets, newSet, setNewSet, selectedDay, setActiveSection, setSelectedDay }) => {
    
    const [value, localValue] = useLocalStorage('plans', '')

    if (!value()) localValue(JSON.stringify(data))

    const [plans, setPlans] = useState(Object.values(JSON.parse(value())))

    const [restTime] = useLocalStorage('restTime')
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
    

    const [time, setTime] = useState(Number(restTime())) // стейт времени

    const muscleMapping = {
        '1': { day: "Вторник", firstMuscle: Object.values(exercises.chest), secondMuscle: Object.values(exercises.triceps) },
        '2': { day: "Четверг", firstMuscle: Object.values(exercises.back), secondMuscle: Object.values(exercises.biceps) },
        '3': { day: "Суббота", firstMuscle: Object.values(exercises.leg), secondMuscle: Object.values(exercises.shoulders) },
    };
    const params = muscleMapping[selectedDay] || { day: "", firstMuscle: [], secondMuscle: [] }; // ну это замена ебаному иф елсу на 15 строчек где в условиях селектед дей === 1 и тд
    
    const [isHaveSets, setIsHaveSets] = useState(false)
    const [storageSets, setStorageSets] = useState([])
    const [counter, setCounter] = useState(0) // counter упражнений, при добавлении упражнения инкрементится
    const [exercisesList, setExercisesList] = useState([params.firstMuscle[counter]]) // список упражнений, инитиал стейт это первое упражнение на ферст маскл
    const [training_0, localTraining_0] = useLocalStorage('training_0', '')
    const [training_1, localTraining_1] = useLocalStorage('training_1', '')
    const [training_2, localTraining_2] = useLocalStorage('training_2', '')

    const addSet = () => { // добавляет сет
        
        if (newSet.trim()) { 
            setSets([...sets, newSet]); // 
            setNewSet("");
            setTime(Number(restTime())) 
            if (isHaveSets === false) setIsHaveSets(true)
        }
    };
    const [isFirstMuscle, setIsFirstMuscle] = useState(true)
     
    const addExerciseFirstMuscle = () => { // добавляет упражнение
        let nextExercise = params.firstMuscle[counter + 1];

        if (!nextExercise) {
            setIsFirstMuscle(false)
            setCounter(-1)
            nextExercise = params.secondMuscle[counter + 1];
            addExerciseSecondMuscle()
            console.log('000 ')
            return 
        }
        if (isHaveSets === true) setIsHaveSets(false)
    
        
        const updatedStorage = [...storageSets];
        updatedStorage[counter] = { sets: [...sets] };
        setStorageSets(updatedStorage);
    
        
        setExercisesList([...exercisesList, nextExercise]); 
        setCounter(counter + 1);
        
        
        saveToLocalStorage(updatedStorage)
        setSets([]);
        setNewSet("");
    };

    const [counter2, setCounter2] = useState(0)
    const addExerciseSecondMuscle = () => { // добавляет упражнение
        let nextExercise = params.secondMuscle[counter2];


        setExercisesList([...exercisesList, nextExercise]); 
        console.log(exercisesList)
        if (!nextExercise) {
            console.log('return')
            return
        }

        if (isHaveSets === true) setIsHaveSets(false)
    
        
        const updatedStorage = [...storageSets];
        updatedStorage[counter] = { sets: [...sets] };
        setStorageSets(updatedStorage);
    
        
        setCounter(counter + 1);
        setCounter2(counter2 + 1);
        
        saveToLocalStorage(updatedStorage)
        
        console.log(sets)
        setSets([]);
        setNewSet("");
    };

    const saveToLocalStorage = (updatedStorage) => {
        switch (selectedDay) {
            case '1':
                localTraining_0(JSON.stringify(updatedStorage))
                console.log(training_0(), 'первая тренька')
                break;
            case '2':
                localTraining_1(JSON.stringify(updatedStorage))
                console.log(training_1(), '2 тренька')
                break;
            case '3':
                localTraining_2(JSON.stringify(updatedStorage))
                // localTraining_2([...training_2(), 'третья тренька'])

                console.log(training_2(), 'третья тренька')
                break;
            default:
                return
        }
    }
    useEffect(()=>{ // при изменении селектед дея возвращает initial state
        setExercisesList([params.firstMuscle[0]]); 
        setStorageSets([{ sets: [], newSet: "" }]); 
        setCounter(0);
        setSets([]);
        setNewSet("");
        
    }, [selectedDay, setNewSet, setSets])
    
    

    
    
    
    
    return (
        <div className={classes.main}>
            
            
            
            {exercisesList.map((exercise, index) => (
                exercise && (
                    <div key={index}>
                        <Header> {exercise} </Header>
                        <SetsList setIsHaveSets={setIsHaveSets} isLast={index===exercisesList.length-1} {...(index === counter ? { sets, setSets, newSet, setNewSet } : storageSets[index])}/>
                        
                    </div>
                )
            ))}
            {isHaveSets && <RestTimer time={time} setTime={setTime}></RestTimer>}
            
                    
                <div className={classes.buttonAddExerciseSection}> 
                    <button className={classes.buttonAddExercise} onClick={isFirstMuscle ? addExerciseFirstMuscle : addExerciseSecondMuscle}>Следующее упражнение</button>
                    <HubButton setSelectedDay={setSelectedDay} setActiveSection={setActiveSection} styleButton={styleButton}></HubButton>
                </div>
                <div className={classes.inputContainer}> 
                    <input className={[classes.inputSets]} type="text" value={newSet} onChange={(e) => setNewSet(e.target.value)} placeholder="Kg/повторения"/>
                    <button className={classes.addSetsButton} onClick={addSet}>Добавить</button>
                </div>
                
            
        </div>
    )
}


const Main = ({selectedDay, setActiveSection, setSelectedDay}) => {

    const [sets, setSets] = useState([]);
    const [newSet, setNewSet] = useState("");
    

    

    const props = { sets, setSets, newSet, setNewSet, selectedDay, setActiveSection, setSelectedDay }

    return (
        <> {selectedDay && <ChildMain {...props}> </ChildMain>} </>
    )
}
export default Main