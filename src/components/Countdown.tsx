import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';


export function Countdown (){

    const { 
        minutes, 
        seconds, 
        hasFinished, 
        startCountdown, 
        resetCountdown, 
        isActive
    } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button 
                disabled 
                className={styles.countdownButton}>

                    Ciclo encerrado
            
                </button>
            ) : (
            <> 
                {isActive ? (
                    <button 
                    onClick={resetCountdown}
                    type="button" 
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
            
                        Abandonar o ciclo
            
                    </button>  
                ):(
                    <button 
                    onClick={startCountdown}
                    type="button" 
                    className={styles.countdownButton}>
    
                        Inicie um ciclo
                
                    </button>
                )}
            </>   

        )} 
        </div>
    );
}