import * as React from 'react'

const PropertyDescription = ({ description }) => {
    return(
        <div className="flex flex-col m-2 lg:m-5 p-2 lg:p-8 rounded-sm shadow-lg">
            <h1 className="text-xl font-medium">Description</h1>
            <div className="flex flex-row items-center mt-4 py-4 border-t border-black/20 text-secondary">
                {description ?
                    <p className="mt-4">{description}</p>
                : null }
            </div>
        </div>
    )
}

export default PropertyDescription