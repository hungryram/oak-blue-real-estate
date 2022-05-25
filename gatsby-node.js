require('dotenv').config()
const fetch = require('node-fetch');
const slugify = require('slugify');
const { createFilePath, createRemoteFileNode } = require("gatsby-source-filesystem");

// Create IDX Listing Source Nodes

exports.sourceNodes = async ({ actions, createContentDigest }) => {

    const { createNode } = actions;

    // Set API Auth

    const authCredential = 'Basic ' + new Buffer.from(process.env.IHOMEFINDERUSERNAME + ':' + process.env.IHOMEFINDERPASSWORD).toString('base64')
    const requestOptions = {
    'method': 'GET',
    'headers': {
        'Accept': 'application/json',
        'Authorization': authCredential,
    }
    };

    // Fetch Listings Data

    const listingsEndpoint = process.env.IHOMEFINDERENDPOINT

    const fetchListings = async () => {
        const listingsResponse = await fetch(listingsEndpoint, requestOptions)
        const listings = await listingsResponse.json();
        const listingsData = Object.values(listings.results);
        return listingsData
    }

    const listingEndpoints = await fetchListings().then((result) => {
        let listingEndpoints = [];
        result.forEach((link) => {
            listingEndpoints.push(link.links.filter(link => link.rel === 'self').map(e => e.href).toString())
        })
        return listingEndpoints;
    })

    const fetchData = async (endpoint) => {
        const response = await fetch(endpoint, requestOptions)
        const data = await response.json()
        return data;
    }

    const formatPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    let listings = [];
  
    await Promise.all(listingEndpoints.map(async (endpoint) => {
        const data = await fetchData(endpoint)
        const photosEndpoint = data.photos.links.filter(link => link.rel === 'self').map(e => e.href).toString()
        const photoArray = await fetchData(photosEndpoint)
        const photoData = await Promise.all(photoArray.results.map(async (result) => {
            const photoEndpoint = result.links.filter(link => link.rel === 'self').map(e => e.href).toString()
            const data = await fetchData(photoEndpoint)
            const photoObj = { _id: data.id, image: data.largeImageUrl, order: data.displayOrder }
            return photoObj
        }))
        const photos = photoData.map(photo => (photo))
        const slug = slugify(`${data.address.houseNumber}-${data.address.streetName}`, { lower: true })
        const status = data.status.charAt(0).toUpperCase() + data.status.slice(1)
        const price = formatPrice.format(data.listPrice)
        const listing = {
            _id: data.id,
            _type: 'IDX',
            title: `${data.address.houseNumber} ${data.address.streetName}`,
            slug: slug,
            cities: data.address.city,
            states: data.address.state,
            zip_codes: data.address.postalCode,
            listing_agent: data.listingAgent,
            status: status,
            price: price,
            details: {
                description: data.description,
                squareFeet: data.squareFeet,
                bedrooms: data.bedrooms,
                fullBathrooms: data.fullBathrooms,
                partialBathrooms: data.partialBathrooms,
                latitude: data.latitude,
                longitude: data.longitude,
            },
            photos: {
                gallery: photos,
            },
        }
        listings.push(listing)
    }))

    // Create IDX Listing Source Nodes

    

    if(listings.length > 0) {

        listings.forEach(async(listing) => {
            await createNode({
              ...listing,
              id: listing._id,
              slug: listing.slug,
              parent: null,
              children: [],
              internal: {
                type: `Idx`,
                content: JSON.stringify(listing),
                contentDigest: createContentDigest(listing)
              }
            })
        })
    }
}

exports.onCreateNode = async ({ node, getNode, createNodeId, actions, store, cache, getCache, createContentDigest }) => {

    const { createNode, createNodeField  } = actions;

    if(node.internal.type === 'Idx'){

        if(node.photos.gallery){
            let imageNodes = []
            await Promise.all(node.photos.gallery.map(async (image) => {
                const imageNode = await createRemoteFileNode({
                    url: image.image,
                    parentNodeId: node.id,
                    store,
                    cache,
                    getCache,
                    createNode,
                    createNodeId,
                })
                .catch(err => {
                    console.log(`Error fetching image file from source: ${image.image} for listing: ${node.title}. The image file likely no longer exists at the source URL.`)
                })
                if(imageNode){
                    imageNodes.push(imageNode)
                }
            }))
            if(imageNodes){
              const filterNodes = imageNodes.filter(imageNode => imageNode.id);
              const orderNodes = filterNodes.sort((a, b) => {
                  let dateA = new Date(a.birthtime)
                  let dateB = new Date(b.birthtime)
                return dateA - dateB;
              });
              createNodeField({
                  node,
                  name: 'photos___NODE',
                  value: orderNodes.map(imageNode => imageNode.id),
              })
              createNodeField({
                  node,
                  name: 'featuredImage___NODE',
                  value: orderNodes[0].id,
              })
            }
        }
    }

    if(node.internal.type === 'File' && node.sourceInstanceName === 'communities' && node.name !== 'index'){
        const slug = createFilePath({ node, getNode, basePath: `pages`})
        const markdownNode = await getNode(node.children[0])
        const content = {
            name: markdownNode.frontmatter.name,
            city: markdownNode.frontmatter.city,
            description: markdownNode.frontmatter.description,
            features: markdownNode.frontmatter.features,
            featured: markdownNode.frontmatter.featured,
            image: markdownNode.frontmatter.image,
        }
        createNode({
            ...content,
            id: `community-${node.id}`,
            slug: slug,
            parent: node.id,
            children: [],
            internal: {
                type: 'Community',
                content: JSON.stringify(content),
                contentDigest: createContentDigest(content)
            }
        })
    }

    if(node.internal.type === 'File' && node.sourceInstanceName === 'blog' && node.name !== 'index'){
        const slug = createFilePath({ node, getNode, basePath: `pages`})
        const markdownNode = await getNode(node.children[0])
        const content = {
            title: markdownNode.frontmatter.title,
            excerpt: markdownNode.frontmatter.excerpt,
            date: markdownNode.frontmatter.date,
            featuredImage: markdownNode.frontmatter.featuredImage,
        }
        createNode({
            ...content,
            id: `blog-${node.id}`,
            slug: slug,
            parent: node.id,
            children: [],
            internal: {
                type: 'Blog',
                content: JSON.stringify(content),
                contentDigest: createContentDigest(content)
            }
        })
    }
}