import * as React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const PageHeader = ({ image, title, subTitle }) => {
    return(
        <div id="pageHeader" className="relative">
            <div className="relative bg-black/70 h-96 z-20">
                <div className="flex flex-col absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <h1 className="text-5xl font-bold text-textLight mt-8 mb-4 text-center">{title}</h1>
                    <div className="flex flex-row items-center justify-center text-textLight">
                        <Link className="text-lg" to="/">Home</Link>
                        {title?
                            <>
                                <span className="mx-4 text-lg">||</span>
                                {subTitle ? 
                                    <Link to={`/${title.toLowerCase()}`} className="text-lg">{title}</Link>
                                : 
                                    <span className="text-lg font-bold">{title}</span>
                                }       
                            </>
                        : null}
                        {subTitle?
                            <>
                                <span className="mx-4 text-lg">||</span>
                                <span className="font-bold text-lg">{subTitle}</span>
                            </>
                        : null}
                    </div>
                </div>     
            </div>
            <GatsbyImage 
                image={image} 
                loading="eager"
                alt={`${title} page header`} 
                className="gatsbyImageBg"
            />
        </div>
    )
}

export default PageHeader