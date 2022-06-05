import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../ui/Button'
const Hero = ({ _key, backgroundImage, heading, buttonText, buttonLink }) => {
    return(

        <div key={_key} className="heroWrapper">
            <GatsbyImage image={backgroundImage.childImageSharp.gatsbyImageData} className="h-96 lg:h-auto w-full" loading="eager" alt="Hero Image"/>
            <div className="heroContent">
                <h1 className="text-textLight text-3xl lg:text-5xl font-semibold">
                    {heading}
                </h1>
                <Button 
                    link={buttonLink}
                    text={buttonText}
                    className="mt-12"
                />
            </div>
        </div>

    )
}

export default Hero