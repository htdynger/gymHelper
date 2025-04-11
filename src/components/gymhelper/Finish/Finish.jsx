import classes from './Finish.module.css'
import QuoteList from '../QuoteList/QuoteList'
import Header from '../Header/Header';
import { useState, useEffect } from 'react';

const Finish = ({ stats }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto'; // возвращаем прокрутку при размонтировании
        };
    }, []);

    const lastIndex = Object.keys(stats).length;
    const lastStats = stats[lastIndex - 1];
    const parsedStats = JSON.parse(lastStats[3]);

    const exerciseCounter = Object.keys(parsedStats).length;

    const [setsCounter, setSetsCounter] = useState(0);

    useEffect(() => {
        let totalSets = 0;
        Object.values(parsedStats).forEach(exerciseArray => {
            totalSets += exerciseArray.length - 1;
        });
        setSetsCounter(totalSets);
    }, [parsedStats]);

    return (
        <div className={classes.all}>
            <QuoteList />
            <div className={classes.main}>
                <div className={classes.exercises}> Упражнений: {exerciseCounter} </div>
                <div className={classes.sets}> Подходов: {setsCounter} </div>
            </div>
            <div className={classes.buttonQuitContainer}> 
                <button className={classes.buttonQuit}> Закончить </button>
            </div>
        </div>
    );
};  

export default Finish;
