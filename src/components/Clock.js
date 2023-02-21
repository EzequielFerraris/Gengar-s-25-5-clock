import '../stylesheets/Clock.css';

function Clock({timeDisplay, timeFormat, onBreak}) 
{
 return (
    <div 
    className="clock-container">
        <h3 id='timer-label'>{onBreak ? 'Break' : 'Session'}</h3>
        <h4 id='time-left'>{timeFormat(timeDisplay, 1)}</h4> 
    </div>
  );
}

export default Clock;