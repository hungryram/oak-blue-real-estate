import * as React from 'react'
import { graphql } from 'gatsby'
import PageHeader from '../../components/templates/PageHeader'
import ListingHeader from '../../components/templates/ListingHeader'
import Gallery from '../../components/templates/Gallery'
import PropertyOverview from '../../components/templates/PropertyOverview'
import PropertyDescription from '../../components/templates/PropertyDescription'
import ScheduleTour from '../../components/templates/ScheduleTour'
import PropertyCard from '../../components/templates/PropertyCard'
import Seo from '../../components/global/Seo'

const PropertyTemplate = ({ data }) => {

  const listing = data.idx
  const details = listing.details
  const featuredImage = listing.fields.featuredImage.childImageSharp.gatsbyImageData 
  const gallery = listing.fields.photos
  const listings = data.allIdx.nodes.filter(node => node.zipCode === listing.zipCode && node.id !== listing.id).slice(0,4)

    return(
        <>
          <Seo pageTitle={listing.title} />
          <PageHeader image={featuredImage} title="Properties" subTitle={listing.title} />
          <div className="max-w-screen-2xl mx-auto">
            <ListingHeader 
              status={listing.status}
              price={listing.price}
              address={listing.title}
              city={listing.city}
              state={listing.state}
              zipCode={listing.zipCode}
            />
            <Gallery photos={gallery} title={listing.title} />
            <PropertyOverview details={details} />
            <PropertyDescription description={details.description} />
            <ScheduleTour listing={listing.title}/>
            { listings ?
              <div className="flex flex-col my-4 mx-2 p-2 lg:m-5 lg:p-8 rounded-sm shadow-lg">
                <h1 className="text-3xl font-bold">More Listings In {listing.zipCode}</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4 py-4 border-t border-black/20 text-secondary">
                  {listings.map((listing, i) => {
                    return(
                      <PropertyCard
                        _key={listing.id}
                        index={i}
                        title={listing.title}
                        city={listing.city}
                        state={listing.state}
                        zipCode={listing.zipCode}
                        price={listing.price}
                        slug={listing.slug}
                        details={listing.details}
                        image={listing.fields.featuredImage.childImageSharp.gatsbyImageData}
                      />
                    )
                  })}
                </div>
              </div>
            : null }
          </div>
        </>
    )
}

export const pageQuery = graphql`
    query($id: String) {
        idx(id: {eq: $id}) {
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
              description
            }
            fields {
              featuredImage {
                  childImageSharp {
                      gatsbyImageData(placeholder: NONE, quality: 100)
                  }
              }
              photos {
                childImageSharp {
                  gatsbyImageData(placeholder: NONE, quality: 100)
                }
              }
            }
            listing_agent
            status
        },
        allIdx {
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
    }
`

export default PropertyTemplate