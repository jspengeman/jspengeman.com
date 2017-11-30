const manifest = require('./manifest')

module.exports = {
  siteMetadata: {
    title: 'Jonathan Spengeman',
    description: 'Thoughts on software development by Jonathan Spengeman.',
    siteUrl: 'https://jspengeman.com',
    avatar: 'http://jspengeman.com/assets/avatar.jpg',
    social: {
      email: 'jonathan.spengeman@gmail.com',
      twitter: 'https://twitter.com/jspengy',
      linkedin: 'https://www.linkedin.com/in/jspengeman/',
      github:  'https://github.com/jspengeman/',
      instagram: 'https://www.instagram.com/jspengy/'
    }
  },
  // TODO: Plugins could be organized better perhaps? How do I test this stuff?
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-100853455-1', 
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `ef8ydsi800nx`,
        accessToken: `a3c0b5934299831ce5b9eeb96e9f152d4579ec88c781e4071a9b4c307742ddf2`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`
          },
          `gatsby-remark-autolink-headers`
        ]
      }
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: manifest,
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulBlogPost } }) => {
              return allContentfulBlogPost.edges.map(({ node }) => ({
                title: node.title,
                date: node.date,
                description: node.content.childMarkdownRemark.excerpt,
                url: `${site.siteMetadata.siteUrl}/${node.slug}`,
                guid: `${site.siteMetadata.siteUrl}/${node.slug}`,
                custom_elements: [{ 
                  'content:encoded': node.content.childMarkdownRemark.html 
                }],
              }));
            },
            query: `
              {
                allContentfulBlogPost(sort: {fields: [date], order: DESC}) {
                  edges {
                    node {
                      title
                      slug
                      date
                      content {
                        childMarkdownRemark {
                          html
                          excerpt(pruneLength: 250)
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: '/atom.xml'
          }
        ]
      }
    },
  ],
}
