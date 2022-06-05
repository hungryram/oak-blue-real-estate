import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../ui/Button'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

const About = ({ _key, heading, subHeading, caption, list, images, buttonText, buttonLink }) => {

    let galleryCols;
    if(images.length === 1){
        galleryCols = 'grid-cols-1'
    }
    else if(images.length === 2){
        galleryCols = 'grid-cols-2'
    }
    else if(images.length === 3){
        galleryCols = 'grid-cols-3'
    }
    else if(images.length >= 4){
        galleryCols = 'grid-cols-4'
    }

    return(
        <div key={_key} className="px-4 py-10 lg:py-20 lg:px-10 w-full bg-background">
            <div key={_key} className="flex flex-col lg:flex-row max-w-screen-2xl mx-auto">
                <div className="flex flex-col lg:w-1/2 lg:ml-auto lg:mr-20 my-auto">
                    <div className="max-w-fit">
                        <h2 className="uppercase text-xl text-primary font-semibold">{heading}</h2>
                        <h1 className="text-3xl font-bold pb-2 border-b border-primary">{subHeading}</h1>
                    </div>
                    <p className="my-8  text-secondary">{caption}</p>
                    <ul>
                    {list.map((item, i) => {
                        return(
                            <li className="flex flex-row items-center my-1" key={i}>
                                <IoMdCheckmarkCircleOutline className="text-xl text-primary" />
                                <span className="ml-2 text-lg">{item.listItem}</span>
                            </li>
                        )
                    })}
                    </ul>
                    <Button 
                        link={buttonLink}
                        text={buttonText}
                        className="mt-12 mb-auto"
                    />
                </div>
                <div className={`hidden w-1/2 lg:grid ${galleryCols}`}>
                    {images.map((image, i) => {
                        return(
                            <GatsbyImage 
                                key={i}
                                className="m-4 rounded-sm"
                                image={image.image.childImageSharp.gatsbyImageData} 
                                alt={`About Our Real Estate Image ${i}`}
                            />
                        )  
                    })}
                </div>
            </div>
        </div>
    )
}

export default About