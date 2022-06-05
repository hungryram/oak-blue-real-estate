import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

const Awards = ({ _key, awards, heading, subHeading, backgroundImage }) => {
    return(
        <div key={_key} className="relative h-96">
            <GatsbyImage className="bg-primary h-full" image={backgroundImage.childImageSharp?.gatsbyImageData} alt="Awards & Recognition background"/>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full flex flex-col items-center text-textLight ${backgroundImage.childImageSharp ? '' : 'bg-primary'}`}>
                <h1 className="lg:text-xl uppercase mt-auto">{heading}</h1>
                <h2 className="mt-2 text-3xl lg:text-4xl font-bold">{subHeading}</h2>
                <ul className="grid grid-cols-2 lg:flex lg:flex-row text-center items-center w-full max-w-screen-xxl m-auto">
                    {awards ?
                        awards.map((award, i) => {
                            return(
                                <li key={i} className="flex flex-col items-center mt-1 lg:mt-0 mx-auto">
                                    <span className="text-4xl lg:text-6xl font-bold">{award.value}</span>
                                    <span className="lg:text-lg mt-2 lg:mt-4">{award.description}</span>
                                </li>
                            )
                        })
                    : null}
                </ul>
            </div>
        </div>
    )
}

export default Awards