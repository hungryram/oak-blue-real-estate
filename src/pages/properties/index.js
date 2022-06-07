import * as React from 'react'
import { graphql } from 'gatsby'
import PageHeader from '../../components/templates/PageHeader'
import PropertyCard from '../../components/templates/PropertyCard'
import { scrollTo } from '../../hooks'
import Seo from '../../components/global/Seo'

const PropertiesIndex = ({ data }) => {

    const pagination = data.file.childMarkdownRemark.frontmatter.propertiesPerPage
    const [ page, setPage ] = React.useState(0)  
    const paginateMin = page * pagination
    const paginateMax = (page + 1) * pagination

    const [ filteredProperties, setFilteredProperties ] = React.useState(data.idx.nodes)

    let cities = []
    let zipCodes = []

    if(data.idx.nodes){
        function uniq(a) {
            return a.sort().filter(function(item, pos, ary) {
                return !pos || item !== ary[pos - 1];
            });
        }
        cities = uniq(data.idx.nodes.map(node => node.city)).sort()
        zipCodes = uniq(data.idx.nodes.map(node => node.zipCode)).sort()
    }

    const [ searchCity, setSearchCity ] = React.useState("Search By City")
    const [ searchZip, setSearchZip ] = React.useState("Search By Zip Code")
    const [ searchPrice, setSearchPrice ] = React.useState({min: null, max: null})

    React.useEffect(() => {
        // Search All
        if(searchCity === "Search By City" && searchZip === "Search By Zip Code" && searchPrice.min === null && searchPrice.max === null){
            setFilteredProperties(data.idx.nodes)
        }
        // Search By City Only
        else if(searchCity !== "Search By City" && searchZip === "Search By Zip Code" && searchPrice.min === null && searchPrice.max === null){
            setFilteredProperties(data.idx.nodes.filter(property => property.city === searchCity))
        }
        // Search By Zip Code Only
        else if(searchCity === "Search By City" && searchZip !== "Search By Zip Code" && searchPrice.min === null && searchPrice.max === null){
            setFilteredProperties(data.idx.nodes.filter(property => property.zipCode === searchZip))
        }
        // Search By City And Zip Code Only
        else if(searchCity !== "Search By City" && searchZip !== "Search By Zip Code" && searchPrice.min === null && searchPrice.max === null){
            setFilteredProperties(data.idx.nodes.filter(property => property.city === searchCity && property.zipCode === searchZip))
        }
        // Search By Price Range Only
        else if(searchCity === "Search By City" && searchZip === "Search By Zip Code" && searchPrice.min !== null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min && parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        }
        else if(searchCity === "Search By City" && searchZip === "Search By Zip Code" && searchPrice.min !== null && searchPrice.max === null){
            setFilteredProperties(data.idx.nodes.filter(property => parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min))
        }
        else if(searchCity === "Search By City" && searchZip === "Search By Zip Code" && searchPrice.min === null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        }
        // Search By City And Price Range
        else if(searchCity !== "Search By City" && searchZip === "Search By Zip Code" && searchPrice.min !== null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => property.city === searchCity && parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min && parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        }    
        else if(searchCity !== "Search By City" && searchZip === "Search By Zip Code" && searchPrice.min !== null && searchPrice.max === null){
            setFilteredProperties(data.idx.nodes.filter(property => property.city === searchCity && parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min))
        }  
        else if(searchCity !== "Search By City" && searchZip === "Search By Zip Code" && searchPrice.min === null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => property.city === searchCity && parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        } 
        // Search By Zip Code And Price Range
        else if(searchCity === "Search By City" && searchZip !== "Search By Zip Code" && searchPrice.min !== null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => property.zipCode === searchZip && parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min && parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        }    
        else if(searchCity === "Search By City" && searchZip !== "Search By Zip Code" && searchPrice.min !== null && searchPrice.max === null){
            setFilteredProperties(data.idx.nodes.filter(property => property.zipCode === searchZip && parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min))
        }  
        else if(searchCity === "Search By City" && searchZip !== "Search By Zip Code" && searchPrice.min === null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => property.zipCode === searchZip && parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        } 
        // Search By City, Zip Code And Price Range
        else if(searchCity !== "Search By City" && searchZip !== "Search By Zip Code" && searchPrice.min !== null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => property.city === searchCity && property.zipCode === searchZip && parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min && parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        }    
        else if(searchCity !== "Search By City" && searchZip !== "Search By Zip Code" && searchPrice.min !== null && searchPrice.max === null){
            setFilteredProperties(data.idx.nodes.filter(property => property.city === searchCity && property.zipCode === searchZip && parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min))
        }  
        else if(searchCity !== "Search By City" && searchZip !== "Search By Zip Code" && searchPrice.min === null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => property.city === searchCity && property.zipCode === searchZip && parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        } 

    }, [ searchCity, searchZip, searchPrice, data.idx.nodes ])

    const [ pages, setPages ] = React.useState(null)
    const [ properties, setProperties ] = React.useState(filteredProperties.slice(paginateMin, paginateMax))

    React.useEffect(() => {
        setPages(Array.from(Array(Math.ceil(filteredProperties.length / pagination)).keys()))
    }, [ filteredProperties, pagination ])

    React.useEffect(() => {
        setProperties(filteredProperties.slice(paginateMin, paginateMax))
    }, [ filteredProperties, page, paginateMin, paginateMax, searchCity, searchZip, searchPrice ])

    React.useEffect(() => {
        if(searchPrice.min?.length === 0){
            setSearchPrice({min: null, max: searchPrice.max})
        }
        if(searchPrice.max?.length === 0){
            setSearchPrice({min: searchPrice.min, max: null})
        }
    }, [ searchPrice ])

    const clearSearch = () => {
        setSearchCity("Search By City")
        setSearchZip("Search By Zip Code")
        setSearchPrice({min: null, max: null})
    }

    React.useEffect(() => {
        setPage(0)
    }, [ pages ])

    React.useEffect(() => {
        if(searchCity === "Search By City" && searchZip === "Search By Zip Code" && searchPrice.min === null && searchPrice.max === null){
            return null
        }
        else {
            scrollTo('pageHeader', 100)
        } 
    }, [ searchCity, searchZip, searchPrice.min, searchPrice.max, page ])

    return(
        <>
            <Seo pageTitle="Properties" />
            <PageHeader 
                title={data.file.childMarkdownRemark.frontmatter.title} 
                image={data.file.childMarkdownRemark.frontmatter.headerImage.childImageSharp.gatsbyImageData} 
            />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center p-4 lg:pt-16">
                <select
                    name="Search By City"
                    aria-label="Search By City"
                    className="formInput my-1 lg:my-0 lg:mx-4 cursor-pointer"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    id="search-cities"
                >
                    <option value="Search By City" disabled>Search By City</option>
                    {cities?.map((city, i) => {
                        return(
                            <option key={i} value={city}>{city}</option>
                        )
                    })}
                </select>
                <select
                    name="Search By Zip Code"
                    aria-label="Search By Zip Code"
                    className="formInput my-1 lg:my-0 lg:mx-4 cursor-pointer"
                    value={searchZip}
                    onChange={(e) => setSearchZip(e.target.value)}
                    id="search-zipcodes"
                >
                    <option value="Search By Zip Code" disabled>Search By Zip Code</option>
                    {zipCodes?.map((zipCode, i) => {
                        return(
                            <option key={i} value={zipCode}>{zipCode}</option>
                        )
                    })}
                </select>
                <input 
                    type="number" 
                    placeholder="Min Price"
                    min="0"
                    value={searchPrice.min} 
                    onChange={(e) => setSearchPrice({min: e.target.value, max: searchPrice.max})}
                    className="formInput my-1 lg:my-0 lg:mx-4"
                />
                <input 
                    type="number" 
                    placeholder="Max Price"
                    min={searchPrice.min}
                    value={searchPrice.max} 
                    onChange={(e) => setSearchPrice({min: searchPrice.min, max: e.target.value})}
                    className="formInput my-1 lg:my-0 lg:mx-4"
                />
                <button 
                    onClick={() => clearSearch()} 
                    className="bg-primary text-secondary filter hover:brightness-90 flex flex-row items-center py-2 px-5 text-sm text-textLight rounded-md max-w-fit transition-colors my-4 lg:my-0 lg:ml-4"
                >
                    Reset
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 p-4 lg:p-8">
                {properties?.map((property, i) => {
                    return(
                        <PropertyCard
                            _key={property.id}
                            index={i}
                            title={property.title}
                            city={property.city}
                            state={property.state}
                            zipCode={property.zipCode}
                            price={property.price}
                            slug={property.slug}
                            details={property.details}
                            image={property.fields.featuredImage.childImageSharp.gatsbyImageData}
                        />
                    )
                })}
            </div>
            <div className="flex flex-row items-center justify-center m-8">
                {page > 0 ?
                    <button 
                        onClick={() => setPage(page - 1)}
                        className="mr-2 text-lg hover:text-primary transition-colors"
                    >
                        Prev
                    </button>
                : null } 
                {pages?.map((e, i) => {
                    return(
                        <button 
                            onClick={() => setPage(i)}
                            className={`mx-1 text-sm h-10 w-10 ${page === i ? 'bg-primary text-textLight font-bold' : ''} `}
                        >
                                {i + 1}
                        </button>
                    )
                })}
                {page < pages?.length - 1 ?
                    <button 
                        onClick={() => setPage(page + 1)}
                        className="mr-2 text-sm hover:text-primary transition-colors"
                    >
                        Next
                    </button>
                : null }            
            </div>
        </>
    )
}

export const PageQuery = graphql`
  query {
    idx: allIdx {
        nodes {
          id
          title
          slug
          city
          state
          zipCode
          price
          details {
            bedrooms
            fullBathrooms
            partialBathrooms
            squareFeet
          }
          fields {
            featuredImage {
              childImageSharp {
                gatsbyImageData(placeholder: NONE, quality: 100)
              }
            }
          }
        }
      }
    file(sourceInstanceName: {eq: "properties"}, name: {eq: "index"}){
      childMarkdownRemark {
        frontmatter {
            title
            propertiesPerPage
            headerImage {
                childImageSharp {
                    gatsbyImageData(placeholder: NONE, quality: 100)
                }
            }
        }
      }
    }
}`

export default PropertiesIndex