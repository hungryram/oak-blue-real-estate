const appearance = require('./src/data/appearance.json')
const colors = appearance.branding.colors

module.exports = {
  siteMetadata: {
    title: "Oak Blue Real Estate",
    description: 'Oak Blue Real Estate Website',
    keywords: "real estate, oak blue",
    siteUrl: "https://www.oakbluerealestate.com"
  },
  plugins: [
    "gatsby-plugin-image", 
    "gatsby-plugin-react-helmet", 
    "gatsby-plugin-sitemap", 
    "gatsby-plugin-postcss", 
    {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: "Oak Blue Real Estate",
      short_name: `Oak Blue`,
      background_color: colors.background,
      lang: `en`,
      theme_color: colors.primary,
      start_url: `/`,
      display: `standalone`,
      cache_busting_mode: "none",
      icon: "src/images/logo-1.png",
      include_favicon: true,
      icon_options: {
        purpose: `any maskable`,
      },
    }
  }, 
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
      "name": "team",
      "path": `${__dirname}/src/content/team`
    },
    __key: "team"
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
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "legal",
      "path": `${__dirname}/src/content/legal`
    },
    __key: "legal"
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "about",
      "path": `${__dirname}/src/content/about`
    },
    __key: "about"
  },
  'gatsby-plugin-netlify'
]
};