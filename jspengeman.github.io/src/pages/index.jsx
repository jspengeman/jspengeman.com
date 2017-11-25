import React from 'react'
import Link from "gatsby-link"

const Home = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <div>
      {posts.map(({ node }) =>
        <Link to={node.fields.slug}>
          <div key={node.id}>
              {node.frontmatter.title}
            <p>
              {node.excerpt}
            </p>
          </div>
        </Link>
      )}
    </div>
  )
}

export const query = graphql`
  query AllPostsQuery {
    allMarkdownRemark(sort: {fields: [fields___date], order: DESC}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            date
            slug
          }
          excerpt
        }
      }
    }
  }
  `

export default Home
