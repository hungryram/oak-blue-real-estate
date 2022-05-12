import * as React from 'react'
import { IoPlaySharp } from 'react-icons/io5'

const VideoTour = ({ _key, video, heading }) => {

    const videoFile = require(`../../videos/${video}`)

    return(
        <div className="videoTourWrapper" key={_key}>
            <video className="videoTour" autoplay="true" loop="true" muted="true" plays-inline="">
                <source src={videoFile.default} type="video/mp4"/>
            </video>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="p-2 border-2 border-textLight/30 max-w-fit mx-auto shadow-md">
                    <div className="p-2 border-2 border-textLight/50 max-w-fit mx-auto shadow-md">
                        <div className="h-24 w-24 bg-primary flex flex-row items-center justify-center">
                            <IoPlaySharp className="text-5xl text-textLight"/>
                        </div>
                    </div>
                </div>
                <h1 className="text-4xl text-textLight font-semibold mt-5">{heading}</h1>
            </div>    
        </div>
    )
}

export default VideoTour