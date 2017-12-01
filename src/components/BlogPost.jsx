import React from 'react'
import Link from "gatsby-link"
import PostDate from './PostDate'

const BlogPost = ({ slug, title, date, excerpt }) => {
  return (
    <article className="index-article">
      <h3><Link to={slug}> {title} </Link></h3>
      <PostDate date={date} />
      <p> {excerpt} </p>
      <Link to={slug} className="read-more"> Read More </Link>
    </article>
  )
}

export default BlogPost