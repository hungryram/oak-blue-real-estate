import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'

const Gallery = ({ photos, title }) => {

    const [ images ] = React.useState(photos.map((photo, i) => { return {photo: photo, display: i}}))
    const length = images.length
    const [ display, setDisplay ] = React.useState(0)
    const [ thumbnails, setThumbnails ] = React.useState(images.filter((photo => photo.display >= display && photo.display <= display + 4)))
    const [ lightbox, setLightbox ] = React.useState(false)

    React.useEffect(() => {
        if(display >= 0 && display < length - 4){
            setThumbnails(images.filter((photo => photo.display >= display && photo.display <= display + 4)))
        } 
        else if(display >= length - 5){
            const dif = length - display
            const arr1 = images.slice(display, length)
            let arr2 = []
            if(dif === 4){
                arr2 = images.slice(0,1)
            }
            else if(dif === 3){
                arr2 = images.slice(0,2)
            }
            else if(dif === 2){
                arr2 = images.slice(0,3)
            }
            else if(dif === 1){
                arr2 = images.slice(0,4)
            }
            return () => {
                setThumbnails(arr1.concat(arr2))
            }
        }
    }, [ display, images, length ])

    const togglePhoto = (direction) => {
        if(direction === 'next'){
            if(display === images.length - 1){
                setDisplay(0)
            }
            else{
                setDisplay(display + 1)
            }
        }
        if(direction === 'previous'){
            if(display === 0){
                setDisplay(images.length - 1)
            }
            else{
                setDisplay(display - 1)
            }
        }
    }



    return(
        <div className={lightbox === true ? 'lightbox' : 'galleryWrapper'}>
            <button 
                onClick={lightbox === true ? () => setLightbox(false) : () => setLightbox(true)}
                aria-label={lightbox === true ? 'Close Lightbox' : 'Open Lightbox'}
                className="absolute top-4 right-4 bg-black/10 text-textLight shadow-md p-2 text-5xl hover:bg-primary/70 hover:text-textLight transition-all z-50"
            >  
            {lightbox === true ?       
                <MdFullscreenExit className="filter drop-shadow-md"/> 
            : 
                <MdFullscreen className="filter drop-shadow-md"/> 
            }
            </button>
            {images?.map((image, i) => {
                return(
                    <GatsbyImage 
                        key={i}
                        image={image.photo.childImageSharp.gatsbyImageData} 
                        alt={`Gallery Image ${i +1} for Oak Blue Real Estate Listing ${title}`}
                        className={`galleryImage transition-all ${display === i ? 'visible' : 'hidden'}`}
                    />    
                )
            })}
            <div className="cursor-pointer absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-row items-center justify-center py-1 px-2 bg-black/20 opacity-50 hover:opacity-100 transition-all duration-300 scale-50 translate-y-1/4 hover:bottom-9 hover:scale-100 rounded-sm">
                {thumbnails?.map((image, i) => {
                    return(
                        <GatsbyImage 
                            key={i}
                            onClick={() => setDisplay(image.display)}
                            image={image.photo.childImageSharp?.gatsbyImageData} 
                            alt={`Thumbnail Image for Oak Blue Real Estate Listing ${title}`}
                            className={`h-20 w-20 m-1 rounded-sm hover:scale-110 transition-all ${image.display === display ? 'shadow-lg': 'shadow-sm'}`}
                        />
                    )
                })}
            </div>
            <button 
                onClick={() => togglePhoto('previous')}
                aria-label="Previous Photo"
                className="absolute left-4 bottom-4 bg-black/10 text-textLight shadow-md p-2 text-4xl md:text-5xl hover:bg-primary/70 hover:text-textLight transition-all"
            >    
                <BsArrowLeft className="filter drop-shadow-md"/>
            </button>  
            <button 
                onClick={() => togglePhoto('next')}
                aria-label="Next Photo"
                className="absolute right-4 bottom-4 bg-black/10 text-textLight shadow-md p-2 text-4xl md:text-5xl hover:bg-primary/70 hover:text-textLight transition-all"
            >    
                <BsArrowRight className="filter drop-shadow-md"/>
            </button>  
        </div>
    )
}

export default Gallery