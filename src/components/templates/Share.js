import * as React from 'react'
import { MdShare } from 'react-icons/md'
import { FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn, FaEnvelope} from 'react-icons/fa'
import { useOnClickOutside } from '../../hooks'
import { window } from 'browser-monads'

const Share = ({ className }) => {

    const url = window.location.href

    const [ clicked, setClicked ] = React.useState(false)
    const ref = React.useRef()
    useOnClickOutside(ref, () => setClicked(false));
    
    
    return(
        <button 
            ref={ref}
            onClick={clicked ? () => setClicked(false) : () => setClicked(true)}
            className={`relative flex flex-row items-center bg-background p-2 shadow-md hover:shadow-xl max-w-fit ${className}`}
        >
            <MdShare className="text-xl mr-2" />
            <span className="text-lg text-secondary">Share</span>
            {clicked === true ?
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full z-50 flex flex-row items-center bg-background shadow-lg rounded-sm p-2 transition-colors">
                    <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full p-2 hover:text-accent"
                    >
                        <FaFacebookF className="text-xl filter drop-shadow-md" />
                    </a>
                    <a 
                        href={`https://twitter.com/share?url=${url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full p-2 hover:text-accent"
                    >
                        <FaTwitter className="text-xl filter drop-shadow-md" />
                    </a>
                    <a 
                        href={`https://www.linkedin.com/shareArticle?url=${url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full p-2 hover:text-accent"
                    >
                        <FaLinkedinIn className="text-xl filter drop-shadow-md" />
                    </a>
                    <a 
                        href={`https://pinterest.com/pin/create/bookmarklet/?url=${url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full p-2 hover:text-accent"
                    >
                        <FaPinterestP className="text-xl filter drop-shadow-md" />
                    </a>
                    <a 
                        href={`mailto:?subject= Oak Blue Real Estate Listing &amp;body= Hi there, Check out this listing from Oak Blue Real Estate: ${url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full p-2 hover:text-accent"
                    >
                        <FaEnvelope className="text-xl filter drop-shadow-md" />
                    </a>
                </div>
            : null }
        </button>
    )
}

export default Share