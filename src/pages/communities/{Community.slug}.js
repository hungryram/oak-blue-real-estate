import * as React from 'react'
import { graphql } from 'gatsby'
import PageHeader from '../../components/templates/PageHeader'

const CommunityTemplate = ({ data }) => {
    return(
        <>
            <PageHeader image={data.community.image.childImageSharp.gatsbyImageData} title="Communities" subTitle={data.community.name} />
        </>
    )
}

export const pageQuery = graphql`
    query($id: String) {
        community(id: {eq: $id}) {
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
`

export default CommunityTemplate