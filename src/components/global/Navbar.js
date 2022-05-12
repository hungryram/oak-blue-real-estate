import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import menu from '../../data/menu.json'
import profile from '../../data/profile.json'
import { BiCaretDown } from 'react-icons/bi'
import { BsTelephone } from 'react-icons/bs'

const Navbar = () => {

    const query = useStaticQuery(graphql`
        {
          dataJson {
             branding {
                logo {
                    childImageSharp {
                        gatsbyImageData(placeholder: NONE, quality: 100)
                    }
                }
             }
          }
       }
    `)

    const [ subMenu, setSubMenu ] = React.useState(null)

    return (
        <nav className="relative w-full h-24 bg-background z-10">
            <div className="absolute top-0 left-2 lg:left-16 xl:left-32">
                <svg height="154" width="175">
                    <polygon className="fill-background" points="0 0, 175 0, 175 110,  87.5 154, 0 110" />
                </svg>
                <GatsbyImage 
                    image={query.dataJson.branding.logo.childImageSharp.gatsbyImageData}
                    loading="eager"
                    className="navLogo"
                    alt={`${profile.company_name} logo`}
                />
            </div>
            <ul className="navMenu">
                {menu.map((menuItem, i) => {
                    if(menuItem.subMenu){
                        return(
                            <li 
                                className="menuItem"
                                key={i}
                                onMouseEnter={() => setSubMenu(menuItem.subMenu)}
                                onMouseLeave={() => setSubMenu(null)}
                            >
                                {menuItem.name}
                                <BiCaretDown className="ml-2 text-textDark"/>
                                {menuItem.subMenu === subMenu ?
                                        <ul className="subMenu">
                                            {menuItem.subMenu.map((menuItem, i) => {
                                                return(
                                                    <li className="subMenuItem" key={i}>
                                                        {menuItem.name}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                : null}
                            </li>
                        )
                    }
                    else{
                        return(
                            <Link 
                                to={menu.link}
                                className="cursor-pointer"
                                key={i}
                            >
                                {menuItem.name}
                            </Link>
                        )
                    }
                })}
            </ul>
            <div className="navContact">
                <BsTelephone className="text-4xl text-primary" />
                <a 
                    className="flex flex-col ml-4"
                    href={`tel:+${profile.contact_information.phone}`}
                >
                    <span className="uppercase font-semibold">Call Us</span>
                    <span className="font-bold text-xl">{profile.contact_information.phone}</span>
                </a>
            </div>
        </nav>
    )
}

export default Navbar