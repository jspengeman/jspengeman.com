module.exports = {
  siteMetadata: {
    title: 'Jonathan Spengeman',
    description: 'Thoughts on software development by Jonathan Spengeman.',
    social: {
      email: 'jonathan.spengeman@gmail.com',
      twitter: 'https://twitter.com/jspengy',
      linkedin: 'https://www.linkedin.com/in/jspengeman/',
      github:  'https://github.com/jspengeman/',
      instagram: 'https://www.instagram.com/jspengy/'
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
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
        ]
      }
    }
  ],
}
