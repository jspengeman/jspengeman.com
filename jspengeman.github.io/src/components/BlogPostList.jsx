import React from 'react'
import BlogPost from './BlogPost'

const BlogPostList = ({ posts }) => {
  return (
    <div>
      {posts.map(({ node }) =>
        <BlogPost 
          key={node.slug}
          slug={node.slug}
          title={node.title}
          date={node.date}
          excerpt={node.content.childMarkdownRemark.excerpt}
        />
      )}
    </div>
  )
}

export default BlogPostList