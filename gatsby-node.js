const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulBlogPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allContentfulBlogPost.edges.map(({ node }) => {
        createPage({
          path: node.slug,
          component: path.resolve(`./src/templates/BlogPost.jsx`),
          context: { slug: node.slug },
          layout: 'Empty'
        })
      })
      resolve()
    })
  })
}