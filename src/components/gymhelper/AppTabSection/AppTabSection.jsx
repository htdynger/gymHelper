import { useState } from "react"
import classes from "./AppTabSection.module.css"
import icon_0 from '../icon/icon_0.webp'
import icon_1 from '../icon/icon_1.webp'
import icon_2 from '../icon/icon_2.webp'
const AppTabSection = ({activeSection, setActiveSection}) => {

    const handleSelectSection = (nameSection) => {
        setActiveSection(nameSection)
    }
    return (
        <div className={classes.main}>
            <div style={{backgroundColor: activeSection === 'main' ? '#defe' : '#fff', boxShadow: activeSection  === 'main' ? '4px 4px 15px rgba(0, 0, 0, 0.3)' : '4px 4px 10px rgba(0, 0, 0, 0.1)'}} onClick={() => handleSelectSection('main')} className={classes.mainButtonContainer}> 
                <img className={classes.mainButtonIcon} src={icon_1}></img>
                <button className={classes.mainButton}> Старт </button>
                
            </div>

            <div style={{backgroundColor: activeSection === 'record' ? '#defe' : '#fff', boxShadow: activeSection  === 'record' ? '4px 4px 15px rgba(0, 0, 0, 0.3)' : '4px 4px 10px rgba(0, 0, 0, 0.1)'}} onClick={() => handleSelectSection('record')} className={classes.mainButtonContainer}>
                <img className={classes.mainButtonIcon} src={icon_0}></img>
                <button className={classes.mainButton}> Прогресс </button>
            </div>

            <div style={{backgroundColor: activeSection === 'settings' ? '#defe' : '#fff', boxShadow: activeSection  === 'settings' ? '4px 4px 15px rgba(0, 0, 0, 0.3)' : '4px 4px 10px rgba(0, 0, 0, 0.1)'}} onClick={() => handleSelectSection('settings')} className={classes.mainButtonContainer}>
                <img className={classes.mainButtonIcon} src={icon_2}></img>
                <button className={classes.mainButton}> Настройки </button>
            </div>
                
                
                
        </div>
    )
}
export default AppTabSection