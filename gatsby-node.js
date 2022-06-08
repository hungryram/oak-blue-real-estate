require('dotenv').config()
const fetch = require('node-fetch');
const slugify = require('slugify');
const { createFilePath, createRemoteFileNode } = require("gatsby-source-filesystem");
const typeDefs = require('./src/graphql/typeDefs');

 // Define Schema Types

 exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    createTypes(typeDefs)
  }
  
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

    // Fetch Listing Data

    const fetchData = async (endpoint) => {
        const res = await fetch(endpoint, requestOptions)
        const data = await res.json();
        return data.results
    }

    const formatPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    
    const listingData = await fetchData(`${process.env.IHOMEFINDERENDPOINT}?fields=id,listingAgent,listingStatus,listPrice,status,description,squareFeet,bedrooms,fullBathrooms,partialBathrooms,address,latitude,longitude,photos`)
    
    // Create Listing Objects

    const listings = await Promise.all(listingData.map(async (listing) => {
        const photosEndpoint = listing.photos.links.filter(link => link.rel === 'self').map(e => e.href).toString()+`?fields=largeImageUrl,displayOrder`
        const photoData = await fetchData(photosEndpoint)
        const featuredImage = photoData.filter(photo => photo.displayOrder === 0)[0]
        const photos = photoData.map(url => ( url.largeImageUrl ))
        const slug = slugify(`${listing.address.houseNumber}-${listing.address.streetName}`, { lower: true })
        const status = listing.status.charAt(0).toUpperCase() + listing.status.slice(1)
        const price = formatPrice.format(listing.listPrice)
        const listingObject = {
            _id: listing.id,
            _type: 'IDX',
            title: `${listing.address.houseNumber} ${listing.address.streetName}`,
            slug: slug,
            city: listing.address.city,
            state: listing.address.state,
            zipCode: listing.address.postalCode,
            listing_agent: listing.listingAgent,
            status: status,
            price: price,
            details: {
                description: listing.description,
                squareFeet: listing.squareFeet,
                bedrooms: listing.bedrooms,
                fullBathrooms: listing.fullBathrooms,
                partialBathrooms: listing.partialBathrooms,
                latitude: listing.latitude,
                longitude: listing.longitude,
            },
            photos: {
                featuredImage: featuredImage.largeImageUrl,
                gallery: photos,
            },
        }
        return listingObject
    }))

    // Create IDX Listing Source Nodes

    if(listings.length > 0) {

        listings.forEach(async(listing) => {
            await createNode({
              ...listing,
              id: listing._id,
              slug: listing.slug,
              zipCode: listing.zipCode,
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
        if(node.photos.featuredImage){
            const imageNode = await createRemoteFileNode({
                url: node.photos.featuredImage,
                parentNodeId: node.id,
                store,
                cache,
                getCache,
                createNode,
                createNodeId,
            })
            .catch(err => {
                console.log(`Error fetching image file from source: ${node.photos.featured} for listing: ${node.title}. The image file likely no longer exists at the source URL.`)
            })
            if(imageNode){
                createNodeField({
                        node,
                        name: 'featuredImage___NODE',
                        value: imageNode.id,
                    })
            }
        }
        if(node.photos.gallery){
            let photos = []
            await Promise.all(node.photos.gallery.map(async (image) => {
                const imageNode = await createRemoteFileNode({
                    url: image,
                    parentNodeId: node.id,
                    store,
                    cache,
                    getCache,
                    createNode,
                    createNodeId,
                })
                .catch(err => {
                    console.log(`Error fetching image file from source: ${image} for listing: ${node.title}. The image file likely no longer exists at the source URL.`)
                })
                if(imageNode){
                    photos.push(imageNode)
                }
            }))
            if(photos.length > 0){
                createNodeField({
                    node,
                    name: 'photos___NODE',
                    value: photos.map(photo => photo.id)
                })
            }
        }
    }

    if(node.internal.type === 'File' && node.sourceInstanceName === 'communities' && node.name !== 'index'){
        const slug = createFilePath({ node, getNode, basePath: `pages`})
        const markdownNode = await getNode(node.children[0])
        createNode({
            ...markdownNode,
            id: `community-${node.id}`,
            slug: slug,
            parent: node.id,
            children: [`${markdownNode.id}`],
            internal: {
                type: 'Community',
                content: JSON.stringify(markdownNode),
                contentDigest: createContentDigest(markdownNode)
            }
        })
    }

    if(node.internal.type === 'File' && node.sourceInstanceName === 'blog' && node.name !== 'index'){
        const slug = createFilePath({ node, getNode, basePath: `pages`})
        const markdownNode = await getNode(node.children[0])
        createNode({
            ...markdownNode,
            id: `blog-${node.id}`,
            slug: slug,
            parent: node.id,
            children: [`${markdownNode.id}`],
            internal: {
                type: 'Blog',
                content: JSON.stringify(markdownNode),
                contentDigest: createContentDigest(markdownNode)
            }
        })
    }

    if(node.internal.type === 'File' && node.sourceInstanceName === 'team' && node.name !== 'index'){
        const slug = createFilePath({ node, getNode, basePath: `pages`})
        const markdownNode = await getNode(node.children[0])
        createNode({
            ...markdownNode,
            id: `team-${node.id}`,
            slug: slug,
            parent: node.id,
            children: [`${markdownNode.id}`],
            internal: {
                type: 'Team',
                content: JSON.stringify(markdownNode),
                contentDigest: createContentDigest(markdownNode)
            }
        })
    }

        // Generate Legal Nodes

        if(node.internal.type === 'File' && node.sourceInstanceName === 'legal' && node.base !== '_index.md'){
            const markdownNode = await getNode(node.children[0])
            const slug = createFilePath({ node, getNode, basePath: `pages` })
            createNode({
                ...markdownNode,
                id: `${node.id}-legal`,
                slug: slug,
                parent: node.id,
                children: [`${markdownNode.id}`],
                internal: {
                    type: 'Legal',
                    content: JSON.stringify(markdownNode),
                    contentDigest: createContentDigest(markdownNode)
                },
            })  
        }
}