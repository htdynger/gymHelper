import { useState, useEffect } from "react";


const TrainingPlan = ({ setPlans, plans }) => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [count, setCount] = useState(0)
    useEffect(()=>{
        console.log(plans)
        console.log(count)
    }, [plans])

    const handleChange = (planIndex, muscleIndex, exerciseIndex, value) => {
        setPlans((prev) => {
            const updatedPlans = { ...prev };
            if (exerciseIndex === null) {
                updatedPlans[planIndex][muscleIndex][0] = value;
            } else {
                updatedPlans[planIndex][muscleIndex][exerciseIndex] = value;
            }
            return updatedPlans;
        });
    };

    const handleDeleteExercise = (planIndex, muscleIndex, exerciseIndex) => {
        setPlans((prev) => {
            const updatedPlans = { ...prev };
            if (updatedPlans[planIndex]?.[muscleIndex]) {
                delete updatedPlans[planIndex][muscleIndex][exerciseIndex];

                const exercises = Object.keys(updatedPlans[planIndex][muscleIndex] || {}).filter(
                    (key) => key !== "0"
                );

                if (exercises.length === 0) {
                    delete updatedPlans[planIndex][muscleIndex];
                }
            }

            const muscles = Object.keys(updatedPlans[planIndex] || {}).filter((key) => key !== "0");
            if (muscles.length === 0) {
                delete updatedPlans[planIndex];
            }

            return updatedPlans;
        });
    };

    const handleAddExercise = (planIndex, muscleIndex) => {
        setPlans((prev) => {
            const currentSection = prev[planIndex][muscleIndex];
            const newIndex = Object.keys(currentSection).length; // Следующий индекс для упражнения
    
            // Добавляем новое упражнение с пустым значением
            return {
                ...prev,
                [planIndex]: {
                    ...prev[planIndex],
                    [muscleIndex]: {
                        ...currentSection,
                        [newIndex]: '', // Новое упражнение
                    },
                },
            };
        });
    };
    
    

    const handleAddMuscleGroup = (planIndex) => {
        setPlans((prev) => {
            const updatedPlans = { ...prev };
    
            // Вычисляем следующий индекс для новой группы мышц
            let nextIndex = Object.keys(updatedPlans[planIndex] || {}).length === 0
                ? 1 // Если групп мышц еще нет
                : Math.max(...Object.keys(updatedPlans[planIndex]).map(Number)) + 1;
    
            // Добавляем новую группу мышц с индексом nextIndex
            return {
                ...prev,
                [planIndex]: {
                    ...prev[planIndex],
                    [nextIndex]: { 0: '' }, // Инициализируем новую группу мышц с пустым упражнением
                },
            };
        });
    };
    

    return (
        <div>
            {selectedPlan === null ? (
                Object.keys(plans).map((planIndex) => (
                    <button key={planIndex} onClick={() => setSelectedPlan(planIndex)}>
                        {plans[planIndex][0]}
                    </button>
                ))
            ) : (
                <div>
                    <div>{plans[selectedPlan][0]}</div>
                    {Object.keys(plans[selectedPlan])
                        .filter((key) => key !== "0")
                        .map((muscleIndex) => (
                            <div key={muscleIndex}>
                                <textarea
                                    value={plans[selectedPlan][muscleIndex][0]}
                                    onChange={(e) =>
                                        handleChange(selectedPlan, muscleIndex, null, e.target.value)
                                    }
                                />

                                <ul>
                                    {Object.keys(plans[selectedPlan][muscleIndex])
                                        .filter((key) => key !== "0")
                                        .map((exerciseIndex) => (
                                            <li key={exerciseIndex}>
                                                <textarea
                                                    value={
                                                        plans[selectedPlan][muscleIndex][exerciseIndex]
                                                    }
                                                    onChange={(e) =>
                                                        handleChange(
                                                            selectedPlan,
                                                            muscleIndex,
                                                            exerciseIndex,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <button
                                                    onClick={() =>
                                                        handleDeleteExercise(
                                                            selectedPlan,
                                                            muscleIndex,
                                                            exerciseIndex
                                                        )
                                                    }
                                                >
                                                    Удалить
                                                </button>
                                            </li>
                                        ))}
                                </ul>
                                <button
                                    onClick={() => handleAddExercise(selectedPlan, muscleIndex)}
                                >
                                    Добавить упражнение
                                </button>
                            </div>
                        ))}

                    <button onClick={() => handleAddMuscleGroup(selectedPlan)}>
                        Добавить группу мышц
                    </button>
                    <button onClick={() => setSelectedPlan(null)}>Назад</button>
                </div>
            )}
        </div>
    );
};

export default TrainingPlan;
