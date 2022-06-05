import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../ui/Button'
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
                            <a href={`tel:+${contact.phone}`} className="p-3 bg-primary hover:bg-accent text-2xl text-textLight transition-colors">
                                <FaPhoneAlt />
                            </a>
                        </div>
                    : null }
                    {contact?.email ?
                        <div className="flex flex-row items-center my-1" >
                            <a href={`mailTo:${contact.email}`} className="p-3 bg-primary hover:bg-accent text-2xl text-textLight transition-colors">
                                <FaPaperPlane />
                            </a>
                        </div>
                    : null }
                </div>
            </div>
            <div className="p-4 flex flex-col">
                {name ?
                    <h1 className="font-bold text-2xl">{name}</h1>
                : null }
                {position ?
                <h2 className="text-primary font-bold text-sm">{position}</h2>
                : null }         
                {slug ?
                    <Button 
                        link={`/team${slug}`}
                        text="Learn More" 
                        className="mt-4"
                    />
                : null }
            </div>
        </div>
    )
}

export default TeamCard