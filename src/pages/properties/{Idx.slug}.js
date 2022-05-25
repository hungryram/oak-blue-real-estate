import * as React from 'react'
import { graphql } from 'gatsby'
import PageHeader from '../../components/templates/PageHeader'

const PropertyTemplate = ({ data }) => {

    return(
        <>
            <PageHeader image={data.idx.fields.featuredImage.childImageSharp.gatsbyImageData} title="Properties" subTitle={data.idx.title} />
        </>
    )
}

export const pageQuery = graphql`
    query($id: String) {
        idx(id: {eq: $id}) {
            title
            slug
            cities
            states
            zip_codes
            price
            details {
              bedrooms
              fullBathrooms
              partialBathrooms
              squareFeet
              description
            }
            fields {
              featuredImage {
                  childImageSharp {
                      gatsbyImageData(placeholder: NONE, quality: 100)
                  }
              }
              photos {
                childImageSharp {
                  gatsbyImageData(placeholder: NONE, quality: 100)
                }
              }
            }
            listing_agent
            status
        }
    }
`

export default PropertyTemplate