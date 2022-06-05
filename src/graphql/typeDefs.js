const typeDefs = `

type ListItem {
    listItem: String
}

type Images {
    altText: String
}

type Awards {
    value: String
    description: String
}

type Testimonials {
    name: String
    caption: String
    testimonial: String
}

type Contact {
    phone: String
    email: String
}

type Sections {
    type: String
    heading: String
    buttonText: String
    buttonLink: String
    subHeading: String
    caption: String
    list: [ListItem]
    images: [Images]
    video: String
    textBlocks: [String]
    imagePosition: String
    addPadding: String
    awards: [Awards]
    testimonials: [Testimonials]
}

type MarkdownRemarkFrontmatter {
    title: String
    excerpt: String
    postsPerPage: Int
    date: Date
    name: String
    city: String
    description: String
    features: [String]
    featured: Boolean
    sections: [Sections]
    propertiesPerPage: Int
    position: String
    contact: Contact
    licenseNumber: String
    pageHeader: String
}

type ChildMarkdownRemark implements Node {
    frontmatter: MarkdownRemarkFrontmatter
    html: String
}

`

module.exports = typeDefs