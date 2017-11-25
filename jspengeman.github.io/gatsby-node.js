const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// TODO: These create fields can be abstracted into separate functions.
exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'MarkdownRemark') {
    // Create the slug field.
    const slug = createFilePath({ node, getNode, basePath: 'posts' })
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })

    // TODO: Should probably match a pattern here so I can change if I want.
    const date = slug.slice(1, 11)
    createNodeField({
      node,
      name: 'date',
      value: date
    })
  }
}
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.map(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/BlogPost.jsx`),
          context: { slug: node.fields.slug }
        })
      })
      resolve()
    })
  })
}