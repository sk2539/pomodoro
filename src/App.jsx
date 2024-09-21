import React, {useState} from "react";
import styling from "./App.css";
import Dropdown from "./components/Dropdown1/Dropdown/Dropdown.jsx";
import DropdownItem from "./components/Dropdown1/DropdownItem/DropdownItem.jsx";
import Dropdown2 from "./components/Dropdown2/Dropdownn/Dropdownn.jsx";
import Timer from "./components/Timer/Timer.jsx";
import Popup from "./components/Popup/Popup.jsx"

const App = () => {
  const items = [1, 15, 25, 35, 45, 60];
  const times = [1, 5, 10, 15];

  const [selectedProductivityTime, setSelectedProductivityTime] = useState(null); //default useState storing number of minutes of productivity
  const [selectedBreakTime, setSelectedBreakTime] = useState(null);
  const [pomodoros, setPomodoros] = useState('');
  const [error, setError] = useState('');

  const handleProductivityTimeSelect = (time) => {
    setSelectedProductivityTime(time);
  };

  const handleBreakTimeSelect = (time) => {
    setSelectedBreakTime(time);
  };

  const handleChange = (event) => {
    setPomodoros(event.target.value);

    if (!isNaN(event.target.value) || event.target.value === '') {
      setPomodoros(event.target.value);
      setError(''); 
    } else {
      setError('Please enter a valid number');
    }
  };

  const handleClick = (event) => {
    setSelectedProductivityTime('');
    setSelectedBreakTime('');
    setPomodoros('');
  };

  return (
    <div className="App">
      <div className = "intro">
        <h1 className="title">Pomodoro for Productivity!</h1>
        <p className="info">Before you start your productivity session, I would like to describe the pomodoro method.
          I recommend picking a single task and sticking to it, although you can be flexible with this method! This method
          involves consistently alternating between being productive and taking a break for certain amounts of time, which
          you can customize. This helps prevent burn-out and with avoiding distractions. Happy studying!
        </p>
      </div>
      <div className="dropdowns">
        <div className="dropdown1">
          <Dropdown 
            buttonText="Select productivity time"
            content={
              <>
                {items.map(item => (
                  <DropdownItem key={item} onClick={() => handleProductivityTimeSelect(item)}>
                    {`${item} minutes`}
                  </DropdownItem>
                ))}
              </>
            }
          />
        </div>
        <div className="dropdown2">
          <Dropdown2 
            buttonText="Select break time"
            content={
              <>
                {times.map(item => (
                  <DropdownItem key={item} onClick={() => handleBreakTimeSelect(item)}>
                    {`${item} minutes`}
                  </DropdownItem>
                ))}
              </>
            }
          />
        </div>
        <div className="pomodoros">
          <input 
            className="input-box"
            placeholder="Enter number of pomodoros"
            value={pomodoros}
            onChange={handleChange}
          />
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
      <div>
        <p className="productivity">Selected Productivity Time: {selectedProductivityTime ? `${selectedProductivityTime} minutes` : 'None'}</p>
        <p className = "break">Selected Break Time: {selectedBreakTime ? `${selectedBreakTime} minutes` : 'None'}</p>
        <p className = "pomos">Selected Number of Pomodoros: {pomodoros ? `${pomodoros} pomodoros` : 'None'}</p>
      </div>
      <div>
        <Timer
        productivityTime={selectedProductivityTime}
        breakTime={selectedBreakTime}
        pomos = {pomodoros}/>
      </div>
      <button className = "button" id = "reset" onClick = {handleClick}>
        Reset
      </button>
    </div>
  );
};

export default App;