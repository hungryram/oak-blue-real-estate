import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import menu from '../../data/menu.json'
import profile from '../../data/profile.json'
import { BiCaretDown } from 'react-icons/bi'
import { BsTelephone } from 'react-icons/bs'
import SocialLinks from "../templates/SocialLinks"
import { useWindowHeight, useWindowWidth, disableScroll, enableScroll } from '../../hooks'

const Navbar = () => {

    const query = useStaticQuery(graphql`
        {
          dataJson(_type: {eq: "appearance"}) {
             branding {
                logoDark {
                    childImageSharp {
                        gatsbyImageData(placeholder: NONE, quality: 100)
                    }
                }
             }
          }
       }
    `)

    const [ subMenu, setSubMenu ] = React.useState(null)
    const [ menuOpen, setMenuOpen ] = React.useState(false)

    if(menuOpen === true ){
        disableScroll();
      }
      else{
        enableScroll();
      }

    let windowHeight = useWindowHeight()
    let windowWidth = useWindowWidth()

    return (
        <nav className="relative w-full h-24 bg-background z-50">
            <Link to="/" className="absolute top-0 left-2 lg:left-16 xl:left-32">
                <svg height="154" width="175">
                    <polygon className="fill-background" points="0 0, 175 0, 175 110,  87.5 154, 0 110" />
                </svg>
                <GatsbyImage 
                    image={query.dataJson.branding.logoDark.childImageSharp.gatsbyImageData}
                    loading="eager"
                    className="navLogo"
                    alt={`${profile.company_name} logo`}
                />
            </Link>
            <ul className={`navMenu ${menuOpen ? 'navMenuOpen' : 'navMenuClosed'}`} style={windowWidth <= 1024 ? {height: windowHeight - 96} : null}>
                {menu.menuLinks.map((menuItem, i) => {
                    if(menuItem.subMenu){
                        return(
                            <Link
                                to={menuItem.link} 
                                className="menuItem"
                                key={i}
                                onMouseEnter={() => setSubMenu(menuItem.subMenu)}
                                onMouseLeave={() => setSubMenu(null)}
                            >
                                {menuItem.name}
                                <BiCaretDown className="ml-2 text-textDark"/>
                                {menuItem.subMenu === subMenu ?
                                        <div className="subMenu">
                                            {menuItem.subMenu.map((menuItem, i) => {
                                                return(
                                                    <Link 
                                                        to={menuItem.link} 
                                                        className="subMenuItem" 
                                                        key={i}
                                                        onClick={menuOpen ? () => setMenuOpen(false) : null}
                                                    >
                                                        {menuItem.name}
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                : null}
                            </Link>
                        )
                    }
                    else{
                        return(
                            <Link 
                                to={menuItem.link}
                                className="menuItem text-lg"
                                key={i}
                                onClick={menuOpen ? () => setMenuOpen(false) : null}
                            >
                                {menuItem.name}
                            </Link>
                        )
                    }
                })}
                <SocialLinks 
                    links={profile.social_media}
                    className='absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl flex lg:hidden flex-row mb-8'
                />
            </ul>
            <button
                aria-label="Navigation Menu Button"
                onClick={() => setMenuOpen(menuOpen === true ? false : true)}
                className={`block lg:hidden absolute right-2 top-1/2 -translate-y-1/2 flex flex-row items-center ml-auto cursor-pointer ${menuOpen === true? 'mr-2' : 'mr-4'}`}
                >
                <div className="relative flex flex-col h-12 w-12">
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 h-1 rounded-lg shadow-md transform transition duration-150 ease-in-out bg-primary ${
                    menuOpen === true
                        ? "-translate-y-1/2 rotate-45 w-8"
                        : "-translate-y-3 w-10 md:w-12"
                    }`}
                />
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1 rounded-lg shadow-md transform transition duration-75 ease-in-out ${
                    menuOpen === true ? "scale-0" : "bg-primary w-10 md:w-12"
                    }`}
                />
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 h-1 rounded-lg shadow-md transform transition duration-150 ease-in-out bg-primary ${
                    menuOpen === true
                        ? "-translate-y-1/2 -rotate-45 w-8"
                        : "translate-y-2 w-10 md:w-12"
                    }`}
                />
                </div>
            </button>
            <Link to="/contact" className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 flex-row items-center bg-primary hover:brightness-90 transition-colors rounded-md shadow-md py-3 px-5 text-textLight">
                <BsTelephone className="text-2xl" />
                <span className="text-xl ml-3 text-secondary">Contact Us</span>
            </Link>
        </nav>
    )
}

export default Navbar