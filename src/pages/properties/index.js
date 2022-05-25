import * as React from 'react'
import { graphql } from 'gatsby'
import PageHeader from '../../components/templates/PageHeader'
import PropertyCard from '../../components/templates/PropertyCard'
import { scrollTo } from '../../hooks'

const PropertiesIndex = ({ data }) => {

    const pagination = data.file.childMarkdownRemark.frontmatter.propertiesPerPage
    const [ page, setPage ] = React.useState(0)  
    const paginateMin = page * pagination
    const paginateMax = (page + 1) * pagination

    const [ filteredProperties, setFilteredProperties ] = React.useState(data.idx.nodes)

    let cities = []
    let states = []

    if(data.idx.nodes){
        function uniq(a) {
            return a.sort().filter(function(item, pos, ary) {
                return !pos || item !== ary[pos - 1];
            });
        }
        cities = uniq(data.idx.nodes.map(node => node.cities)).sort()
        states = uniq(data.idx.nodes.map(node => node.states)).sort()
    }

    const [ searchCity, setSearchCity ] = React.useState("Search By City")
    const [ searchState, setSearchState ] = React.useState("Search By State")
    const [ searchPrice, setSearchPrice ] = React.useState({min: null, max: null})

    React.useEffect(() => {
        // Search All
        if(searchCity === "Search By City" && searchState === "Search By State" && searchPrice.min === null && searchPrice.max === null){
            setFilteredProperties(data.idx.nodes)
        }
        // Search By City Only
        else if(searchCity !== "Search By City" && searchState === "Search By State" && searchPrice.min === null && searchPrice.max === null){
            setFilteredProperties(data.idx.nodes.filter(property => property.cities === searchCity))
        }
        // Search By State Only
        else if(searchCity === "Search By City" && searchState !== "Search By State" && searchPrice.min === null && searchPrice.max === null){
            setFilteredProperties(data.idx.nodes.filter(property => property.states === searchState))
        }
        // Search By Price Range Only
        else if(searchCity === "Search By City" && searchState === "Search By State" && searchPrice.min !== null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min && parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        }
        else if(searchCity === "Search By City" && searchState === "Search By State" && searchPrice.min !== null && searchPrice.max === null){
            setFilteredProperties(data.idx.nodes.filter(property => parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min))
        }
        else if(searchCity === "Search By City" && searchState === "Search By State" && searchPrice.min === null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        }
        // Search By City And Price Range
        else if(searchCity !== "Search By City" && searchState === "Search By State" && searchPrice.min !== null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => property.cities === searchCity && parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min && parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        }    
        else if(searchCity !== "Search By City" && searchState === "Search By State" && searchPrice.min !== null && searchPrice.max === null){
            setFilteredProperties(data.idx.nodes.filter(property => property.cities === searchCity && parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min))
        }  
        else if(searchCity !== "Search By City" && searchState === "Search By State" && searchPrice.min === null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => property.cities === searchCity && parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        } 
        // Search By State And Price Range
        else if(searchCity === "Search By City" && searchState !== "Search By State" && searchPrice.min !== null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => property.states === searchState && parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min && parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        }    
        else if(searchCity === "Search By City" && searchState !== "Search By State" && searchPrice.min !== null && searchPrice.max === null){
            setFilteredProperties(data.idx.nodes.filter(property => property.states === searchState && parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min))
        }  
        else if(searchCity === "Search By City" && searchState !== "Search By State" && searchPrice.min === null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => property.states === searchState && parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        } 
        // Search By City, State And Price Range
        else if(searchCity !== "Search By City" && searchState !== "Search By State" && searchPrice.min !== null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => property.cities === searchCity && property.states === searchState && parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min && parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        }    
        else if(searchCity !== "Search By City" && searchState !== "Search By State" && searchPrice.min !== null && searchPrice.max === null){
            setFilteredProperties(data.idx.nodes.filter(property => property.cities === searchCity && property.states === searchState && parseInt(property.price.replace('$','').replaceAll(',','')) >= searchPrice.min))
        }  
        else if(searchCity !== "Search By City" && searchState !== "Search By State" && searchPrice.min === null && searchPrice.max !== null){
            setFilteredProperties(data.idx.nodes.filter(property => property.cities === searchCity && property.states === searchState && parseInt(property.price.replace('$','').replaceAll(',','')) <= searchPrice.max))
        } 

    }, [ searchCity, searchState, searchPrice, data.idx.nodes ])

    const [ pages, setPages ] = React.useState(null)
    const [ properties, setProperties ] = React.useState(filteredProperties.slice(paginateMin, paginateMax))

    React.useEffect(() => {
        setPages(Array.from(Array(Math.ceil(filteredProperties.length / pagination)).keys()))
    }, [ filteredProperties, pagination ])

    React.useEffect(() => {
        setProperties(filteredProperties.slice(paginateMin, paginateMax))
    }, [ filteredProperties, page, paginateMin, paginateMax, searchCity, searchState, searchPrice ])

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
        setSearchState("Search By State")
        setSearchPrice({min: null, max: null})
    }

    React.useEffect(() => {
        setPage(0)
    }, [ pages ])

    React.useEffect(() => {
        scrollTo('pageHeader')
    }, [ page ])

    return(
        <>
            <PageHeader 
                title={data.file.childMarkdownRemark.frontmatter.title} 
                image={data.file.childMarkdownRemark.frontmatter.headerImage.childImageSharp.gatsbyImageData} 
            />
            <div className="flex flex-row items-center justify-center pt-16">
                <span className="text-3xl font-bold mb-1 mr-2">Search Properties</span>
                <select
                    name="Search By City"
                    aria-label="Search By City"
                    className="formInput mx-4 cursor-pointer"
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
                    name="Search By State"
                    aria-label="Search By State"
                    className="formInput mx-4 cursor-pointer"
                    value={searchState}
                    onChange={(e) => setSearchState(e.target.value)}
                    id="search-states"
                >
                    <option value="Search By State" disabled>Search By State</option>
                    {states?.map((state, i) => {
                        return(
                            <option key={i} value={state}>{state}</option>
                        )
                    })}
                </select>
                <input 
                    type="number" 
                    placeholder="Min Price"
                    min="0"
                    value={searchPrice.min} 
                    onChange={(e) => setSearchPrice({min: e.target.value, max: searchPrice.max})}
                    className="formInput mx-4"
                />
                <input 
                    type="number" 
                    placeholder="Max Price"
                    min={searchPrice.min}
                    value={searchPrice.max} 
                    onChange={(e) => setSearchPrice({min: searchPrice.min, max: e.target.value})}
                    className="formInput mx-4"
                />
                <button 
                    onClick={() => clearSearch()} 
                    className="bg-primary text-secondary filter hover:brightness-90 flex flex-row items-center py-2 px-5 text-sm text-textLight rounded-md max-w-fit transition-colors ml-4"
                >
                    Clear Search Filters
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 p-8">
                {properties?.map((property, i) => {
                    return(
                        <PropertyCard
                            _key={property.id}
                            index={i}
                            title={property.title}
                            city={property.cities}
                            state={property.states}
                            zipCode={property.zip_codes}
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
                            className={`mx-1 text-3xl h-12 w-12 ${page === i ? 'bg-primary text-textLight font-bold' : ''} `}
                        >
                                {i + 1}
                        </button>
                    )
                })}
                {page < pages?.length - 1 ?
                    <button 
                        onClick={() => setPage(page + 1)}
                        className="mr-2 text-lg hover:text-primary transition-colors"
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
          cities
          states
          zip_codes
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