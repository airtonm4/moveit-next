import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

'use strict';

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jsCookie2.default.get('foo');




interface Challenge{
    type : 'body' | 'eye';
    description: string;
    amount: number;
}


interface ChallengesContextData{
    level: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    currentExperience: number;
    activeChallenge: Challenge ;

    startNewChallenge: () => void;
    levelUp: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({ children } : ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    },[] );

    /* useEffect(()=> {
        Cookies.set('level', level.toString );
    },[level] ); */

    function levelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();


        if(Notification.permission === 'granted'){
            new Notification ('Novo desafio 🎉🎉🎉', {
                body: `Valendo ${challenge.amount} xp`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if (!activeChallenge){
        return;
        }
        const { amount } = activeChallenge;

        let finalExperience= currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();    
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

   

    return(
        <ChallengesContext.Provider value={{
         level,
         levelUp, 
         challengesCompleted, 
         currentExperience,
         startNewChallenge,
         activeChallenge,
         resetChallenge,
         experienceToNextLevel,
         completeChallenge
         }}>
            {children}
        </ChallengesContext.Provider>
    );
}