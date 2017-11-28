import React from 'react'
import Link from "gatsby-link"
import BlogPostList from '../components/BlogPostList'

const Home = ({ data }) => {
  return (
    <BlogPostList posts={data.allContentfulBlogPost.edges} />  
  )
}

export const query = graphql`
  query AllPostsQuery {
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
  `

export default Home
