import * as React from 'react'
import { graphql } from 'gatsby'
import PageHeader from '../../components/templates/PageHeader'
import BlogCard from '../../components/templates/BlogCard'

const BlogIndex = ({ data }) => {
    const posts = data.blog.nodes
    return(
        <>
            <PageHeader image={data.file.childMarkdownRemark.frontmatter.headerImage.childImageSharp.gatsbyImageData} title="Blog" />
            <div className="grid grid-cols-3 py-8">
                {posts.map((post, i) => {
                    return(
                        <BlogCard
                            _key={i}
                            slug={post.slug}
                            image={post.featuredImage.childImageSharp.gatsbyImageData}
                            title={post.title}
                            excerpt={post.excerpt}
                            date={post.date}
                        />
                    )
                })}
            </div>
        </>
    )
}

export const PageQuery = graphql`
  query {
    blog: allBlog(sort: {fields: date, order: DESC})  {
      nodes {
        title
        excerpt
        date
        slug
        featuredImage {
            childImageSharp {
                gatsbyImageData(placeholder: NONE, quality: 100)
            }
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