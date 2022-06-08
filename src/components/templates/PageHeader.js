import * as React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const PageHeader = ({ image, title, subTitle }) => {
    return(
        <div id="pageHeader" className="relative">
            <div className="relative bg-black/70 h-96 z-20">
                <div className="flex flex-col absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <h1 className="text-3xl lg:text-4xl font-light uppercase text-textLight mt-8 mb-4 text-center whitespace-nowrap">{title}</h1>
                    <div className="flex flex-row items-center justify-center text-textLight whitespace-nowrap">
                        {subTitle ?
                            null
                        :
                            <div className="flex flex-row items-center">
                                <Link className="text-sm" to="/">Home</Link>
                                <span className="mx-4 text-sm">/</span>
                            </div>
                        }
                        
                        {title?
                            <>                  
                                {subTitle ? 
                                    <div className="flex flex-row items-center">
                                        <Link to={`/${title.toLowerCase()}`} className="text-sm">{title}</Link>
                                        <span className="mx-4 text-lg">/</span>
                                    </div>
                                : 
                                    <div className="flex flex-row items-center">
                                        <span className="text-sm">{title}</span>
                                    </div>
                                }       
                            </>
                        : null}
                        {subTitle?
                            <span className="text-lg">{subTitle}</span>        
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