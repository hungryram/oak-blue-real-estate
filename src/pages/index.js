import * as React from "react"
import { graphql } from "gatsby"
import Hero from "../components/templates/Hero"
import About from "../components/templates/About"
import VideoTour from "../components/templates/VideoTour"

const Index = ({ data }) => {
  return (
    <>
      {data.file.childMarkdownRemark.frontmatter.sections.map((section, i) => {
        if(section.type === 'hero'){
          return(
            <Hero 
              _key={i}
              heading={section.heading}
              buttonText={section.buttonText}
              buttonLink={section.buttonLink}
              backgroundImage={section.backgroundImage} 
            />
          )
        }
        if(section.type === 'about'){
          return(
            <About 
              _key={i}
              heading={section.heading}
              subHeading={section.subHeading}
              caption={section.caption}
              list={section.list}
              images={section.images}
              buttonText={section.buttonText}
              buttonLink={section.buttonLink}
            />
          )
        }
        if(section.type === 'videoTour'){
          return(
            <>
            <VideoTour 
              _key={i}
              heading={section.heading}
              video={section.video}
            />
            <div className="h-80 w-full bg-background"></div>
            </>
          )
        }
        else{
          return null;
        }
      })}
    </>
  )
}

export const IndexQuery = graphql`
  query {
    file(sourceInstanceName: {eq: "main"}, name: {eq: "index"}){
      childMarkdownRemark {
        frontmatter {
          sections {
            type
            heading
            subHeading
            caption
            buttonText
            buttonLink
            backgroundImage {
              childImageSharp {
                gatsbyImageData
              }
            }
            images {
              altText
              image {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            list {
              listItem
            }
            video
          }
        }
      }
  	}
  }
`

export default Index
