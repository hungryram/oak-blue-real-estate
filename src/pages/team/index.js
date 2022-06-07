import * as React from 'react'
import { graphql } from 'gatsby'
import PageHeader from '../../components/templates/PageHeader'
import TeamCard from '../../components/templates/TeamCard'
import Seo from '../../components/global/Seo'

const Team = ({ data }) => {
  const team = data.team.nodes
  return (
    <>
      <Seo pageTitle="Team" />
      <PageHeader image={data.file.childMarkdownRemark.frontmatter.headerImage.childImageSharp.gatsbyImageData} title={data.file.childMarkdownRemark.frontmatter.title} />
      <div className="section">
        <div className="container">
          <div className="max-w-screen-2xl mx-auto p-4 lg:p-8">
            <h1 className="text-3xl font-bold">Meet the Oak Blue Team</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
              {team?.map((teamData, i) => {
                const team = teamData.childMarkdownRemark.frontmatter
                return (
                  <TeamCard
                    _key={i}
                    name={team.name}
                    position={team.position}
                    slug={teamData.slug}
                    contact={team.contact}
                    image={team.photo.childImageSharp.gatsbyImageData}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const PageQuery = graphql`
  query {
    team: allTeam {
      nodes {
        slug
        childMarkdownRemark {
          frontmatter {
            name
            position
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
      }
    },
    file(sourceInstanceName: {eq: "team"}, name: {eq: "index"}){
      childMarkdownRemark {
        frontmatter {
            title
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

export default Team;