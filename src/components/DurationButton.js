import '../stylesheets/DurationButton.css';

function DurationButton({id, title, changeTime, type, time, timeFormat}) {



    return (<div className='inner-container'>
        <h3 className='button-legend'>{title}</h3>
        <div className='timeSets' id={id}>
            <button
            className='duration-button'
            id={type === 'break' ? 'break-increment' : 'session-increment'}
            onClick={() => changeTime(60, type)}
            >+</button>

            <h4 clasName='time-number' id={type === 'break' ? 'break-length' : 'session-length'}>{timeFormat(time, 2)}</h4>

            <button
            className='duration-button'
            id={type === 'break' ? 'break-decrement' : 'session-decrement'}
            onClick={() => changeTime(-60, type)}
            >-</button>
            
        </div>
    </div>)

}

export default DurationButton;