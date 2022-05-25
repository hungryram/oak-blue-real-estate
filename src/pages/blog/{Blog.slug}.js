import * as React from 'react'
import { graphql } from 'gatsby'
import PageHeader from '../../components/templates/PageHeader'

const BlogTemplate = ({ data }) => {
    return(
        <>
            <PageHeader image={data.blog.featuredImage.childImageSharp.gatsbyImageData} title="Blog" subTitle={data.blog.title} />
        </>
    )
}

export const pageQuery = graphql`
    query($id: String) {
        blog(id: {eq: $id}) {
            title
            excerpt
            date
            featuredImage {
              childImageSharp {
                gatsbyImageData(placeholder: NONE, quality: 100)
              }
            }
        }
    }
`

export default BlogTemplate