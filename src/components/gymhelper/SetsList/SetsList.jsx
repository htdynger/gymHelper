import classes from './SetsList.module.css'
const SetsList = ({ sets, setSets, isLast, setIsHaveSets, counterExercise }) => {

    // sets = Object.values(sets)
    
    
      // Функция для удаления задачи
    const deleteSet = (index) => {
        const updatedSets = sets.filter((_, i) => i !== index);
        setSets(updatedSets);
        if (setIsHaveSets && index === sets.length -1) setIsHaveSets(false)
    };

    return (
        <>
            
                {Array.isArray(sets) ? sets.map((task, index) => {
                    if (index === 0) return
                    return (
                        <div className={classes.set} key={index}>
                            <div className={classes.setText}> {index}. Подход: {task} </div>
                            <div className={classes.checkboxContainer}> Отказ <input type="checkbox" /> </div>
                            {isLast && ( <button className={classes.deleteSetButton} type="button" onClick={() => deleteSet(index)}>Удалить</button> ) }
                            
                        </div>
                    )
                    

                }) : <h1> SUKA</h1>}


                



            
        </>
    )
}

export default SetsList