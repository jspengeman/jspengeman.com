import React from 'react'
import { Helmet } from 'react-helmet'

const BlogPost = ({ data }) => {
  const post = data.contentfulBlogPost
  const site = data.site.siteMetadata
  return (
    <div>
      <Helmet>
        <title> {post.title} </title>
        <meta property='og:type' content='article' />
        <meta property='og:title' content={post.title} />
        <meta property='og:site_name' content={site.title} />
        <meta property='og:url' content={`${site.siteUrl}/${post.slug}`} />
        <meta property='og:image' content={site.avatar} />
        <meta property='article:published_time' content={post.date} />
        <meta property='article:author' content={site.siteUrl} />
      </Helmet>
      <section className='markup-area'>
        <div dangerouslySetInnerHTML={{ __html: post.content.childMarkdownRemark.html }} />
        <section className='comments'> </section>
      </section>
    </div>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    site {
      siteMetadata {
        title
        avatar
        siteUrl
      }
    }

    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      date
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default BlogPost