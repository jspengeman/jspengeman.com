import React from 'react'
import Link from "gatsby-link"

const BlogPost = ({ slug, title, date, excerpt }) => {
  return (
    <article className="index-article">
      <h3>
        <Link to={slug}> 
          {title} 
        </Link>
      </h3>
      <div className="line-date">
        <span> {date}</span>
      </div>
      <p> {excerpt} </p>
      <Link to={slug} className="read-more">
        Read More
      </Link>
    </article>
  )
}

export default BlogPost