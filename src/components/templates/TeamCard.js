import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../ui/Button'
import { Link } from 'gatsby'
import { FaPhoneAlt, FaPaperPlane } from 'react-icons/fa'

const TeamCard = ({ _key, name, position, slug, image, contact, className}) => {

    return(
        <div key={_key} className={`flex flex-col hover:shadow-md transition-all ${className ? className : ''}`}>
            <div className="relative h-96 w-full">
                {image ?
                    <GatsbyImage
                        image={image}
                        alt={`Featured image for ${name ? name : null}, ${position ? position : null} at Oak Blue Real Estate.`}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full"
                    />
                : null }
                <div className="flex flex-col absolute right-0 top-1/2 -translate-y-1/2">
                    {contact?.phone ?
                        <div className="flex flex-row items-center my-1" >
                            <a href={`tel:+${contact.phone}`} className="p-3 bg-primary hover:bg-accent text-sm text-textLight transition-colors">
                                <FaPhoneAlt />
                            </a>
                        </div>
                    : null }
                    {contact?.email ?
                        <div className="flex flex-row items-center my-1" >
                            <a href={`mailTo:${contact.email}`} className="p-3 bg-primary hover:bg-accent text-sm text-textLight transition-colors">
                                <FaPaperPlane />
                            </a>
                        </div>
                    : null }
                </div>
            </div>
            <div className="p-4 flex flex-col">
                {name ?
                    <h2 className="font-bold text-lg">{name}</h2>
                : null }
                {position ?
                <h3 className="text-primary font-bold text-sm">{position}</h3>
                : null }         
                {slug ?
                    <Link 
                        to={`/team${slug}`}
                        text="Learn More" 
                        className="mt-4 italic"
                    >
                        Read more
                    </Link>
                : null }
            </div>
        </div>
    )
}

export default TeamCard