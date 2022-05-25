import * as React from 'react'
import { graphql } from 'gatsby'
import PageHeader from '../../components/templates/PageHeader'
import CommunityCard from '../../components/templates/CommunityCard'

const CommunitiesIndex = ({ data }) => {
    const communities = data.communities.nodes
    return(
        <>
            <PageHeader image={data.file.childMarkdownRemark.frontmatter.headerImage.childImageSharp.gatsbyImageData} title={data.file.childMarkdownRemark.frontmatter.title} />
            <div className="grid grid-cols-3 py-8">
                {communities.map((community, i) => {
                    return(
                        <CommunityCard
                            _key={i}
                            slug={community.slug}
                            image={community.image.childImageSharp.gatsbyImageData}
                            title={community.name}
                            city={community.city}
                        />
                    )
                })}
            </div>
        </>
    )
}

export const PageQuery = graphql`
  query {
    communities: allCommunity {
      nodes {
        city
        description
        features
        name
        slug
        image {
            childImageSharp {
                gatsbyImageData(placeholder: NONE, quality: 100)
            }
        }
      }
    },
    file(sourceInstanceName: {eq: "communities"}, name: {eq: "index"}){
        childMarkdownRemark {
          frontmatter {
              title
              communitiesPerPage
              headerImage {
                  childImageSharp {
                      gatsbyImageData(placeholder: NONE, quality: 100)
                  }
              }
          }
        }
      }
  }`


export default CommunitiesIndex