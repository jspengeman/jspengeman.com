import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Helmet } from 'react-helmet'
import { Foreground } from '../layouts'
import Header, { PostHeaderContent } from '../components/Header'
import PostDate from '../components/PostDate'
import Footer from '../components/Footer'
import Comments from '../components/Comments'

const Content = styled.section`
  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: none;
  }
  a:visited {
    color: ${props => lighten(0.3, props.theme.colors.bodyText)};
  }
  a:hover {
    color: ${props => lighten(0.2, props.theme.colors.accent)};
  }
  code {
    padding: 2px 3px 2px 3px;
    border-radius: 5px;
    background-color: #f0f3f3;
  }
`

const CommentsWrapper = styled.section`
  margin-top: 45px;
`

const BlogPost = ({ data }) => {
  const post = data.contentfulBlogPost
  const site = data.site.siteMetadata
  return (
    <div>
      <Header>
        <PostHeaderContent
          title={post.title}
          date={<PostDate date={post.date} invert />}
        />
      </Header>
      <Foreground>
        <Helmet>
          <title> {post.title} </title>
          <meta property="og:type" content="article" />
          <meta property="og:title" content={post.title} />
          <meta property="og:site_name" content={site.title} />
          <meta property="og:url" content={`${site.siteUrl}/${post.slug}`} />
          <meta property="og:image" content={site.avatar} />
          <meta property="article:published_time" content={post.date} />
          <meta property="article:author" content={site.siteUrl} />
        </Helmet>
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: post.content.childMarkdownRemark.html
            }}
          />
          <CommentsWrapper>
            <Comments
              id={post.id}
              title={post.title}
              url={`${site.siteUrl}/${post.slug}`}
            />
          </CommentsWrapper>
        </Content>
      </Foreground>
      <Footer social={site.social} />
    </div>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    site {
      siteMetadata {
        avatar
        siteUrl
        social {
          email
          twitter
          linkedin
          github
        }
      }
    }

    contentfulBlogPost(slug: { eq: $slug }) {
      id
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
