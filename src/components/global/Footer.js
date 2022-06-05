import * as React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import footer from '../../data/footer.json'
import profile from '../../data/profile.json'
import { GatsbyImage } from 'gatsby-plugin-image'
import SocialLinks from '../templates/SocialLinks'
import { FaPhoneAlt, FaPaperPlane, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {

    const query = useStaticQuery(graphql`
        {
            appearance: dataJson(_type: {eq: "appearance"}) {
                branding {
                    logoLight {
                        childImageSharp {
                            gatsbyImageData(placeholder: NONE, quality: 100)
                        }
                    }
                }
            },
            footer: dataJson(_type: {eq: "footer"}) {
                footerIcons {
                    icon {
                        childImageSharp {
                            gatsbyImageData(placeholder: NONE, quality: 100)
                        }
                    }
                }
                footerImage {
                    childImageSharp {
                        gatsbyImageData(placeholder: NONE, quality: 100)
                    }
                }
            }
        }
    `)

    return (
        <footer>
            <div className="relative w-full max-h-fit overflow-hidden">
                <div className="relative w-full bg-black/90 py-2 z-20">
                    <div className="flex flex-col lg:flex-row max-w-screen-2xl mx-auto lg:py-12 px-4 text-secondary">
                        <div className="flex flex-col items-center lg:w-1/4 my-auto p-4">
                            <GatsbyImage
                                image={query.appearance.branding.logoLight.childImageSharp.gatsbyImageData}
                                alt={`${profile.company_name} logo`}
                                className="lg:w-44"
                            />
                            <SocialLinks links={profile.social_media} className="my-8 grid grid-cols-4 gap-4" />
                        </div>
                        <div className="flex flex-col mx-auto text-textLight">
                            <h2 className="text-2xl tracking-tight font-bold">About Us</h2>
                            <ul className="my-auto">
                                {footer.about_us?.map((link, i) => {
                                    return <li key={i} className="my-2" ><Link to={link.link} className="text-lg hover:text-accent transition-colors">{link.name}</Link></li>
                                })}
                            </ul>
                        </div>
                        <div className="flex flex-col mx-auto my-8 lg:my-0 -translate-x-2 lg:translate-x-0 text-textLight">
                            <h2 className="text-2xl tracking-tight font-bold">Quick Links</h2>
                            <ul className="my-auto">
                                {footer.quick_links?.map((link, i) => {
                                    return <li key={i} className="my-2" ><Link to={link.link} className="text-lg hover:text-accent transition-colors">{link.name}</Link></li>
                                })}
                            </ul>
                        </div>
                        <div className="flex flex-col mx-auto text-textLight items-center lg:items-start">
                            <h2 className="text-2xl tracking-tight font-bold -translate-x-8 lg:translate-x-0">Contact</h2>
                            <div className="my-auto">
                                <div className="flex flex-row items-center my-4" >
                                    <a href={`tel:+${profile.contact_information.phone}`} className="rounded-full p-3 bg-accent hover:bg-textLight text-textLight hover:text-accent mr-3  transition-colors">
                                        <FaPhoneAlt className="text-xl" />
                                    </a>
                                    <div className="flex flex-col">
                                        <span className="text-sm">Call Now</span>
                                        <a className="hover:text-accent transition-colors" href={`tel:+${profile.contact_information.phone}`}>{profile.contact_information.phone}</a>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center my-4">
                                    <a href={`mailTo:${profile.contact_information.email}`} className="rounded-full p-3 bg-accent hover:bg-textLight text-textLight hover:text-accent mr-3  transition-colors">
                                        <FaPaperPlane className="text-xl" />
                                    </a>
                                    <div className="flex flex-col">
                                        <span className="text-sm">Email Us</span>
                                        <a className="hover:text-accent transition-colors" href={`mailTo:${profile.contact_information.email}`}>{profile.contact_information.email}</a>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center my-4">
                                    <a
                                        className="rounded-full p-3 bg-accent hover:bg-textLight text-textLight hover:text-accent mr-3 transition-colors"
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
                <GatsbyImage
                    image={query.footer.footerImage.childImageSharp.gatsbyImageData}
                    alt={`${profile.company_name} footer background`}
                    className="gatsbyImageBg"
                />
            </div>
            <div className="flex flex-row items-center max-w-screen-2xl mx-auto p-2">
                <span className="mx-auto text-secondary text-sm lg:text-base"><p className="uk-text-small"><small>&copy; Copyright {new Date().getFullYear()} &middot; {profile.company_name} &middot; Built by <Link to="https://www.hungryram.com/" className="uk-link-reset">Hungry Ram LLC</Link></small></p>                </span>
                <div className="flex flex-row items-center ml-auto">
                    {query.footer.footerIcons.map((iconData, i) => {
                        return (
                            <div key={i} className="m-2">
                                <GatsbyImage className="m-2 w-1/2" image={iconData?.icon?.childImageSharp?.gatsbyImageData} alt={`${profile.company_name} footer icon ${i - 1}`} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </footer>
    )
}

export default Footer