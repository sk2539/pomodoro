import React, { useEffect, useState } from 'react';
import './Timer.css';
import Popup from '../Popup/Popup';

const Timer = ({ productivityTime, breakTime, pomos }) => {
  const [time, setTime] = useState(productivityTime * 60); // Convert minutes to seconds
  const [isRunning, setIsRunning] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [isProductivity, setIsProductivity] = useState(true);
  let [completedPomos, setCompletedPomos] = useState(0); // Track number of completed pomodoros

  useEffect(() => {
    setTime(productivityTime * 60); // Update the timer whenever productivityTime changes
  }, [productivityTime]);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) { // timer is done
            clearInterval(interval);
            setButtonPopup(true);

            if (isProductivity) {
              setIsProductivity(false);
              setTime(breakTime * 60); // Start break time
              completedPomos+=1;
              setCompletedPomos(completedPomos); // Increment pomodoro count
            } else {
              setIsProductivity(true);
              if (completedPomos < pomos) {
                setTime(productivityTime * 60); // Start next productivity time
              } else {
                setIsRunning(false); // Stop the timer after all pomodoros are completed
              }
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time, isProductivity, productivityTime, breakTime, completedPomos, pomos]);

  const closePopup = () => {
    setButtonPopup(false);
  };

  return (
    <div>
      <div>
        <h2 className="timeDisplay">
          {isProductivity ? 'Productivity Time' : 'Break Time'}: 
          {Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60} minutes
        </h2>
        <button className="button" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>
      {buttonPopup && <Popup closePopup={closePopup} isRunning={isRunning} productivity={isProductivity} />}
    </div>
  );
};

export default Timer;
