import * as React from 'react'
import { graphql } from 'gatsby'
import profile from '../data/profile.json'
import PageHeader from '../components/templates/PageHeader'
import { FaMapMarkerAlt, FaPaperPlane, FaPhoneAlt } from 'react-icons/fa'
import Seo from '../components/global/Seo'

const Contact = ({ data }) => {

    const [contact, setContact] = React.useState({ name: '', email: '', message: '' })
    const [disabled, setDisabled] = React.useState(true)

    React.useEffect(() => {
        if (
            contact.name.length !== 0 &&
            contact.email.length !== 0
        ) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }, [
        contact.name.length,
        contact.email.length,
    ])

    const encode = (data) => {
        return Object.keys(data)
            .map(
                (key) =>
                    encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
            )
            .join("&");
    }

    const submitForm = (e) => {
        const formData = {
            name: contact.name,
            email: contact.email,
            message: contact.message,
        }
        e.preventDefault();
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
                "form-name": e.target.getAttribute("name"),
                ...formData
            }),
        })
            .then(
                setContact({ name: '', email: '', message: '' }),
            )
            .catch((error) => console.log(error))
    };
    return (
        <>
            <Seo pageTitle="Contact" />
            <PageHeader image={data.file.childMarkdownRemark.frontmatter.headerImage.childImageSharp.gatsbyImageData} title={data.file.childMarkdownRemark.frontmatter.title} />
            <div className="section">
                <div className="container">
                    <div className="flex flex-col lg:flex-row lg:py-8">
                        <form
                            className="lg:w-1/2 w-full p-4"
                            name="Contact Form"
                            data-netlify="true"
                            data-netlify-honeypot="bot-field"
                            method="POST"
                            onSubmit={(e) => submitForm(e)}
                        >
                            <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
                            <input type="hidden" name="bot-field" />
                            <input type="text"
                                id="contactName"
                                placeholder="Name"
                                value={contact.name}
                                onChange={(e) => setContact({ name: e.target.value, email: contact.email, message: contact.message })}
                                className="formInput mb-4 w-full"
                            />
                            <input type="email"
                                id="contactEmail"
                                placeholder="Email"
                                value={contact.email}
                                onChange={(e) => setContact({ name: contact.name, email: e.target.value, message: contact.message })}
                                className="formInput mb-4 w-full"
                            />
                            <textarea
                                id="contactMessage"
                                placeholder="Message"
                                value={contact.message}
                                rows="8"
                                onChange={(e) => setContact({ name: contact.name, email: contact.email, message: e.target.value })}
                                className="formInput mb-4 w-full"
                            />
                            <button
                                type="submit"
                                className="button"
                                disabled={disabled ? true : false}
                            >
                                Submit
                            </button>
                        </form>
                        <div className="lg:w-1/3 mx-auto p-6 lg:p-8 bg-primary rounded-sm text-textLight my-4">
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