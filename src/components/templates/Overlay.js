import * as React from 'react'
import { FaTimes } from 'react-icons/fa'

const Overlay = ({ button, component }) => {

    const [ open, setOpen ] = React.useState(false)

    return(
        <>
            <button onClick={() => setOpen(true)}>{button}</button>
            {open ?
                <div className="overlay">
                    <button onClick={() => setOpen(false)} className="overlayButton">
                    <FaTimes 
                        className="text-primary hover:text-accent cursor-pointer z-10" 
                        onClick={() => setOpen(false)}
                    />
                    </button>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">  
                        {component}
                    </div>
                </div>
            : null }
        </>
    )
}

export default Overlay