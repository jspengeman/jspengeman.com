module.exports = {
  siteMetadata: {
    title: 'Jonathan Spengeman',
    description: 'Thoughts on software development by Jonathan Spengeman.',
    social: {
      email: 'jonathan.spengeman@gmail.com',
      linkedin: 'https://www.linkedin.com/in/jspengeman/',
      stackoverflow: 'https://stackoverflow.com/users/8112353/jonathan-spengeman/',
      instagram: 'https://www.instagram.com/jspengy/',
      github:  'https://github.com/jspengeman/',
      twitter: 'https://twitter.com/jspengy'
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
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
