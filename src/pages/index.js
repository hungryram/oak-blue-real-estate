import * as React from "react"
import { graphql } from "gatsby"
import Hero from "../components/templates/Hero"
import About from "../components/templates/About"
import VideoTour from "../components/templates/VideoTour"
import Showcase from "../components/templates/Showcase"
import Awards from '../components/templates/Awards'
import FeaturedCommunities from "../components/templates/FeaturedCommunities"
import Testimonials from "../components/templates/Testimonials"

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
            <VideoTour 
              _key={i}
              heading={section.heading}
              video={section.video}
            />
          )
        }
        if(section.type === 'showcase'){
          return(
            <Showcase
              _key={i}
              heading={section.heading}
              subHeading={section.subHeading}
              caption={section.caption}
              textBlocks={section.textBlocks}
              buttonText={section.buttonText}
              buttonLink={section.buttonLink}
              image={section.image}
              imagePosition={section.imagePosition}
              addPadding={section.addPadding}
            />
          )
        }
        if(section.type === 'awards'){
          return (
            <Awards 
              _key={i} 
              heading={section.heading}
              subHeading={section.subHeading}
              backgroundImage={section.backgroundImage}
              awards={section.awards} 
            />
          )
        }
        if(section.type ==='featuredCommunities' && section.show === true){
          return <FeaturedCommunities _key={i}/>
        }
        if(section.type === 'testimonials'){
          return (
            <Testimonials 
              _key={i}
              heading={section.heading} 
              subHeading={section.subHeading} 
              testimonials={section.testimonials} 
            />
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
            textBlocks
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
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            imagePosition
            addPadding
            list {
              listItem
            }
            video
            show
            awards {
              value
              description
            }
            testimonials {
              name
              caption
              testimonial
              image {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
  	}
  }
`

export default Index
