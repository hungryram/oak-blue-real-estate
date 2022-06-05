import * as React from 'react'
import { FaTimes } from 'react-icons/fa'
import { scrollTo } from '../../hooks'

const Overlay = ({ button, component }) => {

    const [ open, setOpen ] = React.useState(false)

    React.useEffect(() => {
        if(open){
            scrollTo('overlay', 300)
        }
    }, [ open ])

    return(
        <>
            <button onClick={() => setOpen(true)}>{button}</button>
            {open ?
                <div id="overlay" className="overlay">
                    <button onClick={() => setOpen(false)} className="overlayButton">
                    <FaTimes 
                        className="text-primary hover:text-accent cursor-pointer z-10" 
                    />
                    </button>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">  
                        {open?
                            <>
                                {component}
                            </>
                        : null}                 
                    </div>
                </div>
            : null }
        </>
    )
}

export default Overlay