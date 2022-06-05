import * as React from 'react'
import { MdPrint } from 'react-icons/md'
import { FaMapMarkerAlt } from 'react-icons/fa'
import Share from './Share'
import { window } from 'browser-monads'

const ListingHeader = ({ status, price, address, city, state, zipCode }) => {
    return(
        <div className="flex flex-col lg:flex-row lg:items-center p-4 lg:p-8">
            <div className="flex flex-col">
                <div className="flex flex-row items-center">
                    <FaMapMarkerAlt className="text-xl mr-2 -ml-1" />
                    <span className="text-lg text-secondary">{address}, {city}, {state} {zipCode}</span>
                </div>
                <div className="flex flex-row items-center my-4 lg:my-0">
                    <span className="mr-2 text-2xl text-secondary">Status:</span>
                    <span className="text-2xl text-secondary font-bold text-primary">{status}</span>
                </div>
            </div>
            <div className="flex flex-col lg:ml-auto">
                <span className="text-4xl text-primary font-bold lg:ml-auto">{price}</span>
                <div className="flex flex-row items-center mt-2">
                    <Share />
                    <button 
                        onClick={window !== 'undefined' ? () => window.print() : null}
                        className="relative flex flex-row items-center bg-background p-2 shadow-md hover:shadow-xl max-w-fit ml-2"
                    >
                        <MdPrint className="text-xl mr-2" />
                        <span className="text-lg text-secondary">Print</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ListingHeader