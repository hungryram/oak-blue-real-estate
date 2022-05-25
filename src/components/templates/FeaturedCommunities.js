import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../ui/Button'

const FeaturedCommunities = ({ _key }) => {

    const data = useStaticQuery(graphql`
    query {
        featuredCommunities: allCommunity(filter: {featured: {eq: true}}) {
          nodes {
            name
            city
            description
            features
            slug
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    `)

    const communities = data.featuredCommunities.nodes
    
    return(
        <div key={_key} className="w-full py-20">
            <div className="flex flex-col items-center max-w-screen-2xl mx-auto">
                <h1 className="text-xl uppercase text-primary font-semibold">Where we build.</h1>
                <h2 className="text-4xl font-bold">Featured Communities</h2>
                <ul className="grid grid-cols-2 mt-20">
                    {communities.map((community, i) => {
                        return(
                            <Link to={`/communities${community.slug}`} key={i} className="flex flex-col m-4">
                                <GatsbyImage 
                                    image={community.image.childImageSharp.gatsbyImageData} 
                                    className="featuredCommunityGalleryImage"
                                    alt={community.name} 
                                />
                                <div className="flex flex-row items-center mt-4">
                                    <div className="w-1/3 bg-primary h-px mr-4"/>
                                    <div className="w-2/3">
                                        <span className="text-primary text-2xl font-bold">{community.name}</span>
                                    </div>
                                </div>
                                <div className="w-2/3 ml-auto pl-3 text-lg" >{community.city}</div>
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