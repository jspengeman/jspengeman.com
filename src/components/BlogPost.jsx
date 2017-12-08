import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import PostDate from './PostDate'

const Article = styled.article`
  margin: 35px auto;
  display: block;
  max-width: 820px;
  &:first-of-type {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`

const Title = styled.h3`
  font-weight: 600;
  margin:0px;
  font-size: 24px;
`

const PostLink = styled(Link)`
  color: #000;
  text-decoration: none;
  transition: 0.1s color ease-out;
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
  &:visited {
    color: #555;
  }
`

const Excerpt = styled.p`
  color: ${props => props.theme.colors.bodyText};
  line-height: 1.5;
`

const ReadMore = styled(Link)`
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  transition: 0.1s color ease-out;
  display: block;
  margin: 12px 0 0 0;
  &:hover {
    opacity: 0.8;
  }
  &:visited {
    color: ${props => props.theme.colors.accent};
  }
`

const BlogPost = ({ slug, title, date, excerpt }) => {
  return (
    <Article>
      <Title><PostLink to={slug}> {title} </PostLink></Title>
      <PostDate date={date} />
      <Excerpt> {excerpt} </Excerpt>
      <ReadMore to={slug}> Read More </ReadMore>
    </Article>
  )
}

export default BlogPost