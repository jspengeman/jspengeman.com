import React from 'react'
import Link from "gatsby-link"
import BlogPostList from '../components/BlogPostList'

const Home = ({ data }) => {
  return (
    <BlogPostList posts={data.allMarkdownRemark.edges} />  
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
          excerpt(pruneLength: 250)
        }
      }
    }
  }
  `

export default Home
