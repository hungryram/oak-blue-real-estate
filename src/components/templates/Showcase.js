import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../ui/Button'

const Showcase = ({ _key, addPadding, heading, subHeading, caption, textBlocks, buttonText, buttonLink, image, imagePosition }) => {
    const verticalPadding = addPadding === 'top' ? 'pt-20' : addPadding === 'bottom' ? 'pb-20' : ''
    return(
        <div key={_key} className={`bg-background w-full ${verticalPadding}`}>
            {imagePosition === 'left' ?
                <div className="flex flex-row max-w-screen-2xl mx-auto">
                    <div className="flex flex-col w-1/2">
                        <GatsbyImage 
                            image={image.childImageSharp.gatsbyImageData} 
                            alt={subHeading} 
                        />
                    </div>
                    <div className="flex flex-col w-1/2">
                    <div className="my-auto ml-20">
                            <div className="max-w-fit">
                                <h2 className="uppercase text-xl text-primary font-semibold">{heading}</h2>
                                <h1 className="text-3xl font-bold pb-2 border-b border-primary">{subHeading}</h1>
                            </div>
                            <p className="my-8 font-semibold text-primary">{caption}</p>
                            {textBlocks ?
                                textBlocks.map((text) => {
                                    return <p className="my-8 font-medium">{text}</p>
                                })
                            : null }
                            <Button 
                                link={buttonLink}
                                text={buttonText}
                                className="my-auto"
                            />
                        </div>
                    </div>  
                </div>
            :
                <div className="flex flex-row max-w-screen-2xl mx-auto">
                    <div className="flex flex-col w-1/2">
                        <div className="my-auto mr-20">
                            <div className="max-w-fit">
                                <h2 className="uppercase text-xl text-primary font-semibold">{heading}</h2>
                                <h1 className="text-3xl font-bold pb-2 border-b border-primary">{subHeading}</h1>
                            </div>
                            <p className="my-8 font-semibold text-primary">{caption}</p>
                            {textBlocks ?
                                textBlocks.map((text) => {
                                    return <p className="my-8 font-medium">{text}</p>
                                })
                            : null }
                            <Button 
                                link={buttonLink}
                                text={buttonText}
                                className="my-auto"
                            />
                        </div>
                    </div> 
                    <div className="flex flex-col w-1/2">
                        <GatsbyImage 
                            image={image.childImageSharp.gatsbyImageData} 
                            alt={subHeading} 
                        />
                    </div> 
                </div>
            }

        </div>
    )
}

export default Showcase