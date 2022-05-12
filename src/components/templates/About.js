import * as React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { BsArrowRight } from 'react-icons/bs'

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
        <div key={_key} className="flex flex-row p-10 bg-background">
            <div className="flex flex-col w-2/5 ml-8 mt-8">
                <div className="max-w-fit">
                    <h2 className="uppercase text-xl text-primary font-semibold">{heading}</h2>
                    <h1 className="text-3xl font-bold pb-2 border-b border-primary">{subHeading}</h1>
                </div>
                <p className="my-8 font-medium">{caption}</p>
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
                <Link 
                    to={buttonLink}
                    className="my-auto bg-primary filter hover:brightness-90 flex flex-row items-center py-3 px-7 text-base text-textLight rounded-md max-w-fit"
                >
                    {buttonText}
                    <BsArrowRight className="ml-4" />
                </Link>
            </div>
            <div className={`w-3/5 ml-8 grid ${galleryCols}`}>
                {images.map((image, i) => {
                    return(
                        <GatsbyImage 
                            key={i}
                            className="m-8 rounded-sm"
                            image={image.image.childImageSharp.gatsbyImageData} 
                            alt={`About Our Real Estate Image ${i}`}
                        />
                    )  
                })}
            </div>
        </div>
    )
}

export default About