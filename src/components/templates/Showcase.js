import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../ui/Button'

const Showcase = ({ _key, addPadding, heading, subHeading, caption, textBlocks, buttonText, buttonLink, image, imagePosition }) => {
    const verticalPadding = addPadding === 'top' ? 'pt-10 lg:pt-20' : addPadding === 'bottom' ? 'pb-10 lg:pb-20' : ''
    return(
        <div key={_key} className={`bg-background w-full lg:px-10 ${verticalPadding}`}>
            {imagePosition === 'left' ?
                <div className="flex flex-col-reverse lg:flex-row max-w-screen-2xl mx-auto">
                    <div className="flex flex-col lg:w-1/2">
                        <GatsbyImage 
                            image={image.childImageSharp.gatsbyImageData} 
                            alt={subHeading} 
                        />
                    </div>
                    <div className="flex flex-col lg:w-1/2">
                    <div className="my-auto px-4 lg:p-0 lg:ml-20">
                            <div className="max-w-fit">
                                <h2 className="uppercase text-xl text-primary font-semibold">{heading}</h2>
                                <h1 className="text-3xl font-bold pb-2 border-b border-primary">{subHeading}</h1>
                            </div>
                            <p className="my-8 font-semibold text-primary">{caption}</p>
                            {textBlocks ?
                                textBlocks.map((text, i) => {
                                    return <p key={i} className="my-8  text-secondary">{text}</p>
                                })
                            : null }
                            <Button 
                                link={buttonLink}
                                text={buttonText}
                                className="mb-8 lg:my-auto"
                            />
                        </div>
                    </div>  
                </div>
            :
                <div className="flex flex-col lg:flex-row max-w-screen-2xl mx-auto">
                    <div className="mt-8 lg:mt-0 flex flex-col lg:w-1/2">
                        <div className="my-auto px-4 lg:p-0 lg:ml-20">
                            <div className="max-w-fit">
                                <h2 className="uppercase text-xl text-primary font-semibold">{heading}</h2>
                                <h1 className="text-3xl font-bold pb-2 border-b border-primary">{subHeading}</h1>
                            </div>
                            <p className="my-8 font-semibold text-primary">{caption}</p>
                            {textBlocks ?
                                textBlocks.map((text,i) => {
                                    return <p key={i} className="my-8  text-secondary">{text}</p>
                                })
                            : null }
                            <Button 
                                link={buttonLink}
                                text={buttonText}
                                className="mb-8 lg:my-auto"
                            />
                        </div>
                    </div> 
                    <div className="flex flex-col lg:w-1/2">
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