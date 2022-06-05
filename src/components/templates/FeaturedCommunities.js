import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../ui/Button'

const FeaturedCommunities = ({ _key }) => {

    const data = useStaticQuery(graphql`
    query {
        featuredCommunities: allCommunity(filter: {childMarkdownRemark: {frontmatter: {featured: {eq: true}}}}) {
          nodes {
              slug
              childMarkdownRemark {
                  frontmatter {
                    name
                    city
                    description
                    features
                    image {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
              }
          }
        }
      }
    `)

    const communities = data.featuredCommunities.nodes
    
    return(
        <div key={_key} className="w-full px-4 lg:px-10 py-10 lg:py-20 ">
            <div className="flex flex-col lg:items-center max-w-screen-2xl mx-auto">
                <h1 className="lg:text-xl uppercase text-primary font-semibold">Where we build.</h1>
                <h2 className="text-2xl lg:text-4xl font-bold">Featured Communities</h2>
                <ul className="grid grid-cols-1 lg:grid-cols-2 mt-8 lg:mt-20">
                    {communities.map((communityData, i) => {
                        const community = communityData.childMarkdownRemark.frontmatter
                        return(
                            <Link to={`/communities${communityData.slug}`} key={i} className="flex flex-col mb-8 lg:m-4">
                                <GatsbyImage 
                                    image={community.image.childImageSharp.gatsbyImageData} 
                                    className="h-48 lg:h-96"
                                    alt={community.name} 
                                />
                                <div className="flex flex-row items-center mt-4">
                                    <div className="hidden lg:block w-1/3 bg-primary h-px mr-4"/>
                                    <div className="lg:w-2/3">
                                        <span className="text-primary text-2xl font-bold">{community.name}</span>
                                    </div>
                                </div>
                                <div className="lg:w-2/3 lg:ml-auto lg:pl-3 text-secondary text-lg" >{community.city}</div>
                            </Link>
                        )
                    })}
                </ul>
                <Button link="/communities" text="View All Communities"/>
            </div>
        </div>
    )
}

export default FeaturedCommunities