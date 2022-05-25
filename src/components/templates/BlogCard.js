import * as React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const BlogCard = ({ _key, image, title, excerpt, date, slug }) => {
    const d = new Date(date)
    const day = d.getDate()
    const month = d.toLocaleString('default', { month: 'short' })
    return(
        <Link key={_key} to={`/blog${slug}`} className="flex flex-col md:m-4 2xl:m-8 border-b border-textDark/10 hover:shadow-md transition-all">
            <div className="relative h-80 w-full">
                <div className="absolute top-1/4 -translate-y-1/4 left-0 shadow-md bg-primary z-20 flex flex-col p-2 items-center text-textLight">
                    <span className="leading-none">{day}</span>
                    <span>{month}</span>
                </div>
                <GatsbyImage
                    image={image}
                    alt={`Featured image for ${title} blog post.`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-b from-black/0 to-black/90 h-20 w-full">
                    <div className="absolute bottom-4 left-4 flex flex-row items-center text-textLight">
                        <h1 className="filter drop-shadow-md text-lg">{title}</h1>
                    </div>
                </div>
            </div>
            <div className="py-2 flex-grow flex flex-col">
                <p className="text-sm text-secondary m-2">{excerpt}</p>
                <span className="ml-2 mt-auto text-xl text-primary font-bold">Read More...</span>
            </div>
        </Link>
    )
}

export default BlogCard