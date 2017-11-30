import React from 'react'
import Link from "gatsby-link"
import BlogPostList from '../components/BlogPostList'
import { Helmet } from 'react-helmet'

const Home = ({ data }) => {
  const site = data.site.siteMetadata
  const [firstName, lastName] = site.title.split(" ")
  return (
    <div>
      <Helmet>
        <title> {site.title} </title>
        <meta name="description" content={site.description} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={site.title} />
        <meta property="og:url" content={site.siteUrl} />
        <meta property="og:image" content={site.avatar} />
        <meta property="profile:first_name" content={firstName} />
        <meta property="profile:last_name" content={lastName} />
      </Helmet>
      <BlogPostList posts={data.allContentfulBlogPost.edges} />  
    </div>
  )
}

export const query = graphql`
  query AllPostsQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }

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
