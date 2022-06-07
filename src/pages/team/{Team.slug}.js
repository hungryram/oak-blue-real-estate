import * as React from 'react'
import { graphql } from 'gatsby'
import PageHeader from '../../components/templates/PageHeader'
import TeamCard from '../../components/templates/TeamCard'
import { FaPhoneAlt, FaPaperPlane } from 'react-icons/fa'
import Seo from '../../components/global/Seo'

const TeamMember = ({ data }) => {
  const team = data.team.childMarkdownRemark
  let firstName;
  if (team.frontmatter.name) {
    firstName = team.frontmatter.name.split(' ')[0]
  }
  return (
    <>
      <Seo pageTitle={team.frontmatter.name} />
      <PageHeader image={data.file.childMarkdownRemark.frontmatter.headerImage.childImageSharp.gatsbyImageData} title={team.frontmatter.name} />
      <div className="section">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items center max-w-screen-2xl mx-auto">
            <TeamCard
              name={team.frontmatter.name}
              position={team.frontmatter.position}
              image={team.frontmatter.photo.childImageSharp.gatsbyImageData}
              className="lg:w-1/3 shadow-md lg:shadow-none"
            />
            <div className="flex flex-col lg:w-2/3 px-2 py-8 lg:p-0 lg:ml-8">
              <h2 className="text-primary uppercase font-medium">{team.frontmatter.pageHeader}</h2>
              <h1 className="font-bold text-3xl mt-2">About {firstName}</h1>
              <div className="text-secondary my-4 md-content" dangerouslySetInnerHTML={{ __html: team.html }} />
              {team.frontmatter.contact ?
                <>
                  <h3 className="font-bold mt-4">Get in touch with {firstName}</h3>
                  <div className="flex flex-col my-2">
                    {team.frontmatter.contact.phone ?
                      <div className="flex flex-row items-center my-1" >
                        <a href={`tel:+${team.frontmatter.contact.phone}`} className="rounded-full p-3 bg-primary hover:bg-accent text-textLight mr-3  transition-colors">
                          <FaPhoneAlt />
                        </a>
                        <div className="flex flex-col">
                          <a className="hover:text-accent transition-colors" href={`tel:+${team.frontmatter.contact.phone}`}>{team.frontmatter.contact.phone}</a>
                        </div>
                      </div>
                      : null}
                    {team.frontmatter.contact.email ?
                      <div className="flex flex-row items-center my-1">
                        <a href={`mailTo:${team.frontmatter.contact.email}`} className="rounded-full p-3 bg-primary hover:bg-accent text-textLight mr-3  transition-colors">
                          <FaPaperPlane />
                        </a>
                        <div className="flex flex-col">
                          <a className="hover:text-accent transition-colors" href={`mailTo:${team.frontmatter.contact.email}`}>
                            {team.frontmatter.contact.email}
                          </a>
                        </div>
                      </div>
                      : null}
                  </div>
                </>
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const PageQuery = graphql`
  query ($id: String) {
    team(id: { eq: $id }) {
      childMarkdownRemark {
        frontmatter {
          name
          position
          pageHeader
          contact {
            phone
            email
          }
          photo {
            childImageSharp {
              gatsbyImageData(placeholder: NONE, quality: 100)
            }
          }
        }
        html
      }
    },
    file(sourceInstanceName: {eq: "team"}, name: {eq: "index"}){
      childMarkdownRemark {
        frontmatter {
            headerImage {
                childImageSharp {
                    gatsbyImageData(placeholder: NONE, quality: 100)
                }
            }
        }
      }
    }
  }
`;

export default TeamMember;