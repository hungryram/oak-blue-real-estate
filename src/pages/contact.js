import * as React from 'react'
import { graphql } from 'gatsby'
import profile from '../data/profile.json'
import PageHeader from '../components/templates/PageHeader'
import Button from '../components/ui/Button'
import { FaMapMarkerAlt, FaPaperPlane, FaPhoneAlt } from 'react-icons/fa'

const Contact = ({ data }) => {

    const [ contact, setContact ] = React.useState({name: '', email: '', message: ''})
    return(
        <>
            <PageHeader image={data.file.childMarkdownRemark.frontmatter.headerImage.childImageSharp.gatsbyImageData} title={data.file.childMarkdownRemark.frontmatter.title} />
            <div className="flex flex-row mx-auto max-w-screen-2xl py-8">
                <div className="w-1/2 mx-auto p-4">
                    <h1 className="text-4xl font-bold">Get In Touch</h1>
                    <input type="text" 
                        placeholder="Enter Your Name" 
                        value={contact.name} 
                        onChange={(e) => setContact({name: e.target.value, email: contact.email, message: contact.message}) } 
                        className="formInput my-4 w-full"
                    />
                    <input type="email" 
                        placeholder="Enter Your Email" 
                        value={contact.email} 
                        onChange={(e) => setContact({name: contact.name, email: e.target.value, message: contact.message}) } 
                        className="formInput my-4 w-full"
                    />
                    <textarea 
                        placeholder="Enter Your Message" 
                        value={contact.message} 
                        rows="8"
                        onChange={(e) => setContact({name: contact.name, email: contact.email, message: e.target.value}) } 
                        className="formInput my-4 w-full"
                    />
                    <Button
                        text="Submit"
                        className=""
                        onClick={() => setContact({name: '', email: '', message: ''})}
                    />
                </div>
                <div className="w-1/3 mx-auto p-8 bg-primary rounded-sm text-textLight">
                    <h1 className="text-3xl">Contact</h1>
                            <div className="flex flex-row items-center my-8" >
                                <a href={`tel:+${profile.contact_information.phone}`} className="rounded-full p-3 bg-background hover:bg-accent hover:text-textLight text-primary mr-3 transition-colors">
                                    <FaPhoneAlt className="text-xl" />
                                </a>
                                <div className="flex flex-col">
                                    <span className="text-sm">Call Now</span>
                                    <a className="hover:text-accent transition-colors" href={`tel:+${profile.contact_information.phone}`}>{profile.contact_information.phone}</a>
                                </div>
                            </div>
                            <div className="flex flex-row items-center my-8">
                                <a href={`mailTo:${profile.contact_information.email}`} className="rounded-full p-3 bg-background hover:bg-accent hover:text-textLight text-primary mr-3 transition-colors">
                                    <FaPaperPlane className="text-xl" />
                                </a>
                                <div className="flex flex-col">
                                    <span className="text-sm">Email Us</span>
                                    <a className="hover:text-accent transition-colors" href={`mailTo:${profile.contact_information.email}`}>{profile.contact_information.email}</a>
                                </div>
                            </div>
                            <div className="flex flex-row items-center my-8">
                                <a
                                    className="rounded-full p-3 bg-background hover:bg-accent hover:text-textLight text-primary mr-3 transition-colors"
                                    href={`https://www.google.com/maps/place/${profile.contact_information.address.replaceAll(' ', '+')},+${profile.contact_information.city},+${profile.contact_information.state},+${profile.contact_information.zip_code}`}
                                    target="blank"
                                >
                                    <FaMapMarkerAlt className="text-xl" />
                                </a>
                                <div className="flex flex-col">
                                    <span className="text-sm">Our Office</span>
                                    <a 
                                        className="hover:text-accent transition-colors" 
                                        href={`https://www.google.com/maps/place/${profile.contact_information.address.replaceAll(' ', '+')},+${profile.contact_information.city},+${profile.contact_information.state},+${profile.contact_information.zip_code}`}
                                        target="blank"
                                    >
                                        {profile.contact_information.address}, {profile.contact_information.city}, {profile.contact_information.state} {profile.contact_information.zip_code}
                                    </a>
                                </div>
                            </div>
                </div>
            </div>
        </>
    )
}

export const PageQuery = graphql`
    query {
        file(sourceInstanceName: {eq: "contact"}, name: {eq: "index"}){
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
`

export default Contact