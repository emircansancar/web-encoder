module.exports = {
  siteMetadata: {
    title: `Web Encoder`,
    description: `web-encoder is an encoding and checking tool for the web.`,
    author: `@EmirCanSANCAR`,
    keywords: [
      'MD5',
      'SHA1',
      'SHA256',
      'SHA224',
      'SHA512',
      'SHA384',
      'SHA3',
      'RIPEMD160',

      'hash',
      'generator,',
      'create',
      'string',
      'encode',
      'decode',
      'encrypt',
      'md5 generator,',
      'md5 online',
      'md5 check',
      'md5 checksum',
    ]
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
        javascriptEnabled: true,
        modifyVars: {
          // 'primary-color': '#663399',
          // 'font-family': '-apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji',          
          // 'layout-body-background': '#66ff79'
        }
      },
    },
    `gatsby-plugin-sass`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
