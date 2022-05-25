import * as React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FaMapMarkerAlt } from 'react-icons/fa'

const CommunityCard = ({ _key, image, title, city, slug }) => {
    return(
        <Link key={_key} to={`/communities${slug}`} className="flex flex-col md:m-4 2xl:m-8 border-b border-textDark/10 hover:shadow-md transition-all">
            <div className="relative h-80 w-full">
                <GatsbyImage
                    image={image}
                    alt={`Featured image for ${title} community listing.`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-b from-black/0 to-black/80 h-20 w-full">
                    <div className="absolute bottom-4 left-4 flex flex-row items-center text-textLight">
                        <FaMapMarkerAlt className="text-xl mr-2 filter drop-shadow-md" />
                        <span className="filter drop-shadow-md">{title}, {city}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CommunityCard