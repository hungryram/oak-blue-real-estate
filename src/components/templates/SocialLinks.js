import * as React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaLinkedinIn, FaTiktok, FaYoutube, FaYelp } from 'react-icons/fa'

const Facebook = ({ username }) => {
    return(
        <a href={`https://www.facebook.com/${username}`} className="socialLink">
            <FaFacebookF/>
        </a>
    )
}

const Instagram = ({ username }) => {
    return(
        <a href={`https://www.instagram.com/${username}`} className="socialLink">
            <FaInstagram/>
        </a>
    )
}

const Twitter = ({ username }) => {
    return(
        <a href={`https://www.twitter.com/${username}`} className="socialLink">
            <FaTwitter/>
        </a>
    )
}

const Pinterest = ({ username }) => {
    return(
        <a href={`https://www.pinterest.com/${username}`} className="socialLink">
            <FaPinterestP/>
        </a>
    )
}

const LinkedIn = ({ username }) => {
    return(
        <a href={`https://www.linkedin.com/${username}`} className="socialLink">
            <FaLinkedinIn/>
        </a>
    )
}

const YouTube = ({ username }) => {
    return(
        <a href={`https://www.youtube.com/${username}`} className="socialLink">
            <FaYoutube/>
        </a>
    )
}

const TikTok = ({ username }) => {
    return(
        <a href={`https://www.tiktok.com/${username}`} className="socialLink">
            <FaTiktok/>
        </a>
    )
}

const Yelp = ({ username }) => {
    return(
        <a href={`https://www.yelp.com/${username}`} className="socialLink">
            <FaYelp/>
        </a>
    )
}

const SocialLinks = ({ links, className }) => {
    return(
        <div className={className}>
            {links.instagram ? <Instagram username={links.instagram} /> : null }
            {links.twitter ? <Twitter username={links.twitter} /> : null }
            {links.facebook ? <Facebook username={links.facebook} /> : null }
            {links.pinterest ? <Pinterest username={links.pinterest} /> : null }
            {links.yelp ? <Yelp username={links.yelp} /> : null }
            {links.linkedin ? <LinkedIn username={links.linkedin} /> : null }
            {links.tiktok ? <TikTok username={links.tiktok} /> : null }
            {links.youtube ? <YouTube username={links.youtube} /> : null }
        </div>
    )
}

export default SocialLinks