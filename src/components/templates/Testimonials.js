import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { RiDoubleQuotesL } from 'react-icons/ri'

const Testimonials = ({ _key, heading, subHeading, testimonials }) => {

    const [ display, setDisplay ] = React.useState(0)
    

    const toggleDisplay = ({ direction, length}) => {
        console.log('Display:', display, 'Direction:', direction, 'Length:', length)
        if(direction === 'forward' && display === length - 1){
            setDisplay(0)
        }
        else if(direction === 'forward' && display < length - 1){
            setDisplay(display + 1)
        }
        else if(direction === 'back' && display === 0){
            setDisplay(length - 1)
        }
        else if(direction === 'back' && display > 0){
            setDisplay(display - 1)
        }
    }

    React.useEffect(()=> {
        const interval = setInterval(() => {
            if(display !== testimonials.length - 1){
                setDisplay(display + 1)
            }
            else{
                setDisplay(0)
            }
        }, 3500)
        return () => clearInterval(interval)
    })

    return(
        <div key={_key} className="max-w-screen-2xl mx-auto py-20">
            <h2 className="uppercase text-xl text-primary font-semibold">{heading}</h2>
            <h1 className="text-3xl font-bold">{subHeading}</h1>
            <div className="testimonialWrapper shadow-xl w-full relative mt-10">
                {testimonials.map((testimonial, i) => {
                    return(
                        <div key={i} className={`flex flex-row h-full w-full absolute top-0 left-0 bg-background ${display === i ? 'z-20' : 'z-10'} transition-all`}>
                            <div className="relative w-2/3">
                                <RiDoubleQuotesL className="absolute top-12 left-12 z-10 text-primary/30 text-7xl filter drop-shadow-sm" />
                                <div className="flex flex-col w-3/4 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-secondary h-full py-10 z-20">
                                <p className="italic my-auto">{testimonial.testimonial}</p>
                                <span className="font-bold">{testimonial.name}</span>
                                <span className="mb-auto">{testimonial.caption}</span>
                                </div>
                            </div>
                            <GatsbyImage image={testimonial.image.childImageSharp.gatsbyImageData} className="w-1/3" alt={testimonial.caption} />
                        </div>
                    )
                })}
                <div className="absolute bottom-4 left-0 flex flex-row items-center z-20 w-2/3 justify-center">
                    {testimonials.map((testimonial, i) => {
                        return(
                            <button 
                                key={i} 
                                onClick={() => setDisplay(i)} 
                                onKeyDown={() => setDisplay(i)} 
                                className={`h-4 w-4 rounded-full mx-1 hover:bg-primary/100 shadow-sm ${display === i ? 'bg-primary/100' : 'bg-primary/50'}`} 
                                aria-label={display === i ? `Current Testimonial Slide: ${i + 1}` : `Toggle Testimonial Slide ${i + 1}`} 
                            />
                        )
                    })}
                    <button 
                        onClick={() => toggleDisplay({ direction: 'back', length: testimonials.length})} 
                        onKeyDown={() => toggleDisplay({ direction: 'back', length: testimonials.length})}
                        className="absolute left-4 bottom-0 bg-primary/20 text-primary rounded-full shadow-md p-2 text-xl hover:bg-primary/90 hover:text-textLight" 
                        aria-label="View Previous Testimonial"
                    >
                        <BsArrowLeft/>
                    </button>
                    <button 
                        onClick={() => toggleDisplay({ direction: 'forward', length: testimonials.length})} 
                        onKeyDown={() => toggleDisplay({ direction: 'forward', length: testimonials.length})}
                        className="absolute right-4 bottom-0 bg-primary/20 text-primary rounded-full shadow-md p-2 text-xl hover:bg-primary/90 hover:text-textLight" 
                        aria-label="View Next Testimonial"
                    >
                        <BsArrowRight/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Testimonials