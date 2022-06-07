import * as React from 'react'
import { graphql } from 'gatsby'
import PageHeader from '../../components/templates/PageHeader'
import BlogCard from '../../components/templates/BlogCard'
import Seo from '../../components/global/Seo'

const BlogIndex = ({ data }) => {
    const posts = data.blog.nodes
    return (
        <>
            <Seo pageTitle="Blog" />
            <PageHeader image={data.file.childMarkdownRemark.frontmatter.headerImage.childImageSharp.gatsbyImageData} title="Blog" />
            <div className="section">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 lg:px-0 py-8">
                        {posts.map((postData, i) => {
                            const post = postData.childMarkdownRemark.frontmatter
                            return (
                                <BlogCard
                                    _key={i}
                                    slug={postData.slug}
                                    image={post.featuredImage.childImageSharp.gatsbyImageData}
                                    title={post.title}
                                    excerpt={post.excerpt}
                                    date={post.date}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export const PageQuery = graphql`
  query {
    blog: allBlog(sort: {fields: frontmatter___date, order: DESC})  {
      nodes {
          slug
          childMarkdownRemark {
              frontmatter {
                title
                excerpt
                date
                featuredImage {
                    childImageSharp {
                        gatsbyImageData(placeholder: NONE, quality: 100)
                    }
                }
              }
              html
          }
      }
    },
    file(sourceInstanceName: {eq: "blog"}, name: {eq: "index"}){
        childMarkdownRemark {
          frontmatter {
              title
              postsPerPage
              headerImage {
                  childImageSharp {
                      gatsbyImageData(placeholder: NONE, quality: 100)
                  }
              }
          }
        }
      }
  }`

export default BlogIndex