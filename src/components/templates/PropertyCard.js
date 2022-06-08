import * as React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { BiBed, BiBath, BiArea } from 'react-icons/bi'

const PropertyCard = ({ _key, title, city, state, zipCode, details, slug, price, image}) => {

    return(
        <Link key={_key} to={`/properties/${slug}`} className="flex flex-col md:m-4 2xl:m-8 border-b border-textDark/10 hover:shadow-md transition-all">
            <div className="relative h-80 w-full">
                <GatsbyImage
                    image={image}
                    alt={`Featured image for ${title}, ${city}, ${state}, ${zipCode} property listing.`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-b from-black/0 to-black/80 h-20 w-full">
                    <div className="absolute bottom-4 left-4 flex flex-row items-center text-textLight">
                        <FaMapMarkerAlt className="text-xl mr-2 filter drop-shadow-md" />
                        <span className="filter drop-shadow-md">{title}, {city}, {state}, {zipCode}</span>
                    </div>
                </div>
            </div>
            <div className="p-2 flex flex-row items-center divide-x divide-textDark/10 py-4">
                <span className="font-medium text-primary mr-auto">{price}</span>
                <div className="flex flex-col lg:flex-row items-center px-2 mr-2">
                    <BiBed className="text-xl mx-2 text-primary"/>
                    <span className="text-secondary">{details.bedrooms} Bed</span>
                </div>
                <div className="flex flex-col lg:flex-row items-center px-2 mr-2">
                    <BiBath className="text-xl mx-2  text-primary"/>
                    <span className="text-secondary">{details.fullBathrooms + details.partialBathrooms} Bath</span>
                </div>
                <div className="flex flex-col lg:flex-row items-center px-2 mr-2">
                    <BiArea className="text-xl mx-2  text-primary"/>
                    <span className="text-secondary">{details.squareFeet} ft<sup>2</sup></span>
                </div>
            </div>
        </Link>
    )
}

export default PropertyCard