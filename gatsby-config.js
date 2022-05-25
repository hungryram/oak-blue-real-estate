module.exports = {
  siteMetadata: {
    title: `oak-blue-real-estate`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-plugin-image", 
    "gatsby-plugin-react-helmet", 
    "gatsby-plugin-sitemap", 
    "gatsby-plugin-postcss", 
    //{
    //resolve: 'gatsby-plugin-manifest',
    //options: {
      //"icon": "src/images/icon.png"
   // }
   // }, 
  "gatsby-transformer-remark", 
  "gatsby-transformer-sharp",
  "gatsby-plugin-sharp", 
  "gatsby-transformer-json",
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": `${__dirname}/src/data`
    },
    __key: "data"
  }, 
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": `${__dirname}/src/images`
    },
    __key: "images"
  }, 
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": `${__dirname}/src/pages`
    },
    __key: "pages"
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      "name": "main",
      "path": `${__dirname}/src/content/main`,
    },
    __key: "main"
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "properties",
      "path": `${__dirname}/src/content/properties`
    },
    __key: "properties"
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "blog",
      "path": `${__dirname}/src/content/blog`
    },
    __key: "blog"
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "communities",
      "path": `${__dirname}/src/content/communities`
    },
    __key: "communities"
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "contact",
      "path": `${__dirname}/src/content/contact`
    },
    __key: "contact"
  },
  'gatsby-plugin-netlify'
]
};