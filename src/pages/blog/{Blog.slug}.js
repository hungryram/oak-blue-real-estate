import * as React from 'react'
import { graphql } from 'gatsby'
import PageHeader from '../../components/templates/PageHeader'
import { GatsbyImage } from 'gatsby-plugin-image'
import Share from '../../components/templates/Share'
import Seo from '../../components/global/Seo'

const BlogTemplate = ({ data }) => {
    const post = data.blog.childMarkdownRemark
    return(
        <>
            <Seo pageTitle={post.frontmatter.title} />
            <PageHeader image={post.frontmatter.featuredImage.childImageSharp.gatsbyImageData} title="Blog" subTitle={post.frontmatter.title} />
            <div className="flex flex-col-reverse lg:flex-row py-4 lg:p-8 lg:my-8 max-w-screen-2xl mx-auto">
            <div className="lg:w-1/4 m-2 lg:m-0">
                    {post.frontmatter.featuredImage ?
                        <GatsbyImage
                            image={post.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
                            alt={`Featured Image for Blog Post: ${post.frontmatter.title}`}
                            className="rounded-sm shadow-lg"
                        />
                    : null }
                </div>
                <div className="flex flex-col lg:w-3/4">
                    <div className="flex flex-col lg:flex-row lg:items-center border-b border-black pb-4 m-4">
                        <div className="flex flex-col">
                            {post.frontmatter.title ?
                                <h1 className="text-2xl lg:text-3xl font-bold text-primary">{post.frontmatter.title}</h1>
                            : null }
                            {data.blog.frontmatter.date ?
                                <span className="text-secondary">{data.blog.frontmatter.date}</span>
                            : null}                         
                        </div>
                        <Share className="mt-4 lg:mt-0 lg:ml-auto"/>
                    </div>
                    <div className="px-4 lg:py-4 text-secondary italic">
                        {post.frontmatter.excerpt ?
                            <span>{post.frontmatter.excerpt}</span>
                        : null }
                    </div>
                </div>
            </div>
            <div 
                className="p-4 lg:py-0 lg:px-8 md-content max-w-screen-2xl mx-auto"
                dangerouslySetInnerHTML={{__html: post.html}}
            />
        </>
    )
}

export const pageQuery = graphql`
    query($id: String) {
        blog(id: {eq: $id}) {
            slug
            childMarkdownRemark {
                frontmatter {
                  title
                  excerpt
                  featuredImage {
                      childImageSharp {
                          gatsbyImageData(placeholder: NONE, quality: 100)
                      }
                  }
                }
                html
            }
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
              }
        }
    }
`

export default BlogTemplate