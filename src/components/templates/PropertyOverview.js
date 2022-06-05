import * as React from 'react'
import { BiBed, BiBath, BiArea } from 'react-icons/bi'

const PropertyOverview = ({ details }) => {
    return(
        <div className="flex flex-col m-2 lg:m-5 p-2 lg:p-8 rounded-sm shadow-lg">
            <h1 className="text-3xl font-bold">Overview</h1>
            <div className="flex flex-row items-center mt-4 py-4 border-t border-black/20 text-secondary">
                {details.bedrooms ?
                    <div className="flex flex-col items-center mt-4 mr-4">
                        <BiBed className="text-4xl mb-4" />
                        <span>{details.bedrooms} Bedrooms</span>
                    </div>
                : null }
                {details.partialBathrooms || details.fullBathrooms ?
                    <div className="flex flex-col items-center mt-4 mx-4">
                        <BiBath className="text-4xl mb-4" />
                        <span>{details.partialBathrooms + details.fullBathrooms} Bathrooms</span>
                    </div>
                : null }
                {details.squareFeet ?
                    <div className="flex flex-col items-center mt-4 ml-4">
                        <BiArea className="text-4xl mb-4" />
                        <span>{details.squareFeet} ft<sup>2</sup></span>
                    </div>
                : null }
            </div>
        </div>
    )
}

export default PropertyOverview