import '../stylesheets/ControlerButton.css';

function ControlerButton({type, timer, action}) {
    
    const buttonLegend = (type) => {
        if(type === 'play/pause') {
            if(timer) 
            {
                return 'Pause';
            }
            else
            {
                return 'Play!'
            }
        }
        else if(type === 'reset')
        {
            return 'Reset';
        }
    };

    return (<button
            className='controler-button'
            id={type === 'reset' ? 'reset' : 'start_stop' }
            onClick={() => type === 'play/pause' ? action() : action(25 * 60)}
            >{buttonLegend(type)}</button>)
}

export default ControlerButton;