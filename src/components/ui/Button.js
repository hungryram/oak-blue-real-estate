import * as React from 'react'
import { Link } from 'gatsby'
import { BsArrowRight } from 'react-icons/bs'

const Button = ({ className, onClick, link, text }) => {
    if(link){
        return(
            <Link to={link} className={`button ${className}`}>
                {text}
                <BsArrowRight className="ml-4" />
            </Link>
        )
    }
    else{
        return(
            <button onClick={onClick} className={`button ${className}`}>
                {text}
                <BsArrowRight className="ml-4" />
            </button>
        )
    }
}

export default Button;