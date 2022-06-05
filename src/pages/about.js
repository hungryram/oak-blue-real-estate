import * as React from 'react'
import { graphql } from 'gatsby'
import PageHeader from '../components/templates/PageHeader'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../components/ui/Button'
import Seo from '../components/global/Seo'

const About = ({ data }) => {
    const about = data.file.childMarkdownRemark
    return(
        <>
            <Seo pageTitle="About" />
            <PageHeader 
                image={about.frontmatter.headerImage.childImageSharp.gatsbyImageData} 
                title={about.frontmatter.title} 
            />
            <div className="flex flex-col lg:flex-row items center max-w-screen-2xl mx-auto py-20 p-4">
            <div className="lg:w-2/5">
                <GatsbyImage 
                    image={about.frontmatter.pageImage.childImageSharp.gatsbyImageData} 
                    alt={`${about.frontmatter.title} Page Image`}
                    className="w-full"
                />
            </div>
            <div className="flex flex-col lg:w-3/5 mt-4 lg:mt-0 lg:ml-8">
              <h2 className="text-primary uppercase font-bold">{about.frontmatter.pageHeader}</h2>
              <h1 className="font-bold text-3xl mt-2">About Oak Blue Real Estate</h1>
              <div 
                className="text-secondary my-4 md-content" 
                dangerouslySetInnerHTML={{__html: about.html}}
              />
              <Button 
                link="/team"
                text="Meet Our Team"
                className="my-auto"
              />
            </div>
          </div>
        </>
    )
}

export const PageQuery = graphql`
    query {
        file(sourceInstanceName: {eq: "about"}, name: {eq: "index"}){
            childMarkdownRemark {
              frontmatter {
                  title
                  headerImage {
                      childImageSharp {
                          gatsbyImageData(placeholder: NONE, quality: 100)
                      }
                  }
                  pageImage {
                      childImageSharp {
                          gatsbyImageData(placeholder: NONE, quality: 100)
                      }
                  }
              }
              html
            }
          }
    }
`

export default About