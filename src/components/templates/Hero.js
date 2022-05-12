import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { BsArrowRight } from 'react-icons/bs'

const Hero = ({ _key, backgroundImage, heading, buttonText, buttonLink }) => {
    return(

        <div key={_key} className="heroWrapper">
            <GatsbyImage image={backgroundImage.childImageSharp.gatsbyImageData} className="h-full" loading="eager" alt="Hero Image"/>
            <div className="heroContent">
                <h1 className="text-textLight text-5xl font-semibold">
                    {heading}
                </h1>
                <Link 
                    to={buttonLink}
                    className="mt-12 bg-primary filter hover:brightness-90 flex flex-row items-center py-3 px-7 text-base text-textLight rounded-md"
                >
                    {buttonText}
                    <BsArrowRight className="ml-4" />
                </Link>
            </div>
        </div>

    )
}

export default Hero