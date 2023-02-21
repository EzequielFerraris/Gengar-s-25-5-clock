import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import gengar from './images/gengar.png';
import Clock from './components/Clock';
import DurationButton from './components/DurationButton';
import ControlerButton from './components/ControlerButton';


function App() 
{
  const [timeDisplay, setTimeDisplay] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timer, setTimer] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  

  let beepSound = useRef(null);
  const playSound = () => {
    beepSound.currentTime = 0;
    beepSound.play();
  }
  const beepUrl ='https://cdn.pixabay.com/audio/2021/09/08/audio_30fd70d538.mp3';

  const timeFormat = (time, format) => {
    let minutes = Math.floor( time / 60);
    let seconds = time % 60;
    if(format === 1)
    {
      return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }
    else
    {
      return (minutes);
    }
  };


  const changeTime = (amount, type) => {
    if(type === 'break')
    {
      if((breakTime <= 60 && amount < 0) || (breakTime >= 3600)) 
      {
        return false;
      }
      let newBreakTime = breakTime + amount;
      setBreakTime(newBreakTime);
    }
    else if(type === 'session')
    {
      if((sessionTime <= 60 && amount < 0) || (sessionTime >= 3600)) 
      {
        return false;
      }
      let newSession = sessionTime + amount;
      setSessionTime(newSession);
      if(!timer)
      {
        setTimeDisplay(sessionTime + amount);
      }
    }
  }

  useEffect(() => {
    if(timeDisplay <= 0)
    {
      setOnBreak(true);
      playSound();
    }
    else if (!timer && timeDisplay === breakTime)
    {
      setOnBreak(false)
    }
  }, [timeDisplay, onBreak, timer, breakTime, sessionTime])

  const timeCountdown = () => {
    let seconds = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + seconds;
    let check = onBreak;
    if(!timer)
    {
      let interval = setInterval(() => {
      date = new Date().getTime();
      if(date > nextDate)
      {
        setTimeDisplay((prev) => {
          if(prev <= 0 && !check)
          {
            check = true;
            setOnBreak(true);
            return breakTime;
          }
          else
          {
            if(prev <=0 && check)
            {
              check = false;
              setOnBreak(false);
              return sessionTime;
            }
          }
          return prev -1;
        });
        nextDate += seconds;
      }
    }, 30);
    localStorage.clear();
    localStorage.setItem('interval-id', interval);
    }
    else if(timer) {
      clearInterval(localStorage.getItem('interval-id'));
    }
    setTimer(!timer);
  };
  
  const reboot = () => {
    clearInterval(localStorage.getItem("interval-id"));
    setTimeDisplay(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setOnBreak(false);
    setTimer(false);
    beepSound.pause(); 
    beepSound.currentTime = 0;
  };

  return (
    <div className="App">
      <h1 className='title'>Gengar's clock</h1>
      <div className='buttons-container'>
        <DurationButton 
        id= 'break-label'
        title={'Break length'}
        changeTime={changeTime}
        type={'break'}
        time={breakTime}
        timeFormat={timeFormat}
        />

        <DurationButton 
        id='session-label'
        title={'Session length'}
        changeTime={changeTime}
        type={'session'}
        time={sessionTime}
        timeFormat={timeFormat}
        />

      </div>

      <Clock 
      timeDisplay={timeDisplay}
      timeFormat={timeFormat}
      onBreak={onBreak}
      />
    
      <div className='controlers-container'>
        <ControlerButton type='play/pause' timer={timer} action={timeCountdown} />
        <ControlerButton type='reset' timer={null} action={reboot}/>

       
      </div>
        
      <img
      className='gengar-image'
      src={gengar}
      alt='Gengar'
      />

      <img
      className='gengar-image2'
      src={gengar}
      alt='Gengar'
      />
      
      <audio 
        ref={((p) => {beepSound = p})}
        id='beep'
        src={beepUrl}
      ></audio> 
    
    </div>
  );
}

export default App;
