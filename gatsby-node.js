const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = async ({ node, getNode, actions, createContentDigest }) => {
    const { createNode } = actions;

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
}