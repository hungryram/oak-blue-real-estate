import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { BsArrowRight } from 'react-icons/bs'

const Hero = ({ _key, backgroundImage, heading, buttonText, buttonLink }) => {
    return(

        <div key={_key} className="heroWrapper">
            <GatsbyImage image={backgroundImage.childImageSharp.gatsbyImageData} className="w-full" loading="eager" alt="Hero Image"/>
            <div className="heroContent">
                <h1 className="text-textLight text-5xl font-semibold">
                    {heading}
                </h1>
                <Link 
                    to={buttonLink}
                    className="button mt-12"
                >
                    {buttonText}
                    <BsArrowRight className="ml-4" />
                </Link>
            </div>
        </div>

    )
}

export default Hero