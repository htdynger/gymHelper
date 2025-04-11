import React, { useState } from "react";
import Header from "./Header/Header";
import TrainingPlanSection from "./TrainingPlanSection/TrainingPlanSection.jsx";
import Main from "./Main/Main";

import './index.css';
import Setting from "./Settings/Settings";
import SelectDaySection from "./SelectDaySection/SelectDaySection.jsx";
import AppTabSection from "./AppTabSection/AppTabSection.jsx";
import Record from "./Record/Record.jsx";
const App = () => {
    

    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [activeSection, setActiveSection] = useState('none');


    return (
        <>
            {activeSection === 'none' && (
                <div>
                    
                    <h1> я заебался это делать, так по идее хватит</h1>


                </div>
            )}

            {activeSection === 'main' && (
                <div>
                    
                    {selectedPlan == null && <TrainingPlanSection setSelectedPlan={setSelectedPlan} selectedPlan={selectedPlan}></TrainingPlanSection>}
                    {selectedPlan !=null && selectedDay == null && <SelectDaySection setSelectedDay={setSelectedDay} selectedDay={selectedDay} selectedPlan={selectedPlan}> </SelectDaySection>}
                    {selectedPlan !=null && selectedDay !=null && <Main setSelectedDay={setSelectedDay} selectedDay={selectedDay} setActiveSection={setActiveSection} selectedPlan={selectedPlan}></Main>}
                    
                </div>
            )}

            {activeSection === 'settings' && (
                <>
                    <Setting></Setting>
                </>
            )}

            {activeSection === 'record' && (
                <>
                    <Record></Record>
                </>
            )}

            

            {selectedPlan == null && <AppTabSection activeSection={activeSection} setActiveSection={setActiveSection}></AppTabSection>}
        </>
    );
};

export default App;
