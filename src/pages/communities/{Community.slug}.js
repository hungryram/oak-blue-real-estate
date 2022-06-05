import * as React from 'react'
import { graphql } from 'gatsby'
import PageHeader from '../../components/templates/PageHeader'
import Seo from '../../components/global/Seo'

const CommunityTemplate = ({ data }) => {
    const community = data.community.childMarkdownRemark.frontmatter
    return(
        <>
            <Seo pageTitle={community.name} />
            <PageHeader image={community.image.childImageSharp.gatsbyImageData} title="Communities" subTitle={community.name} />
        </>
    )
}

export const pageQuery = graphql`
    query($id: String) {
        community(id: {eq: $id}) {
            childMarkdownRemark {
                frontmatter {
                    name
                    description
                    city
                    features
                    image {
                      childImageSharp {
                        gatsbyImageData(placeholder: NONE, quality: 100)
                      }
                    }
                }
            }
        }
    }
`

export default CommunityTemplate