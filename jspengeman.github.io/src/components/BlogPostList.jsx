import React from 'react'
import BlogPost from './BlogPost'

const BlogPostList = ({ posts }) => {
  return (
    <div>
      {posts.map(({ node }) =>
        <BlogPost 
          key={node.id}
          slug={node.fields.slug}
          title={node.frontmatter.title}
          date={node.fields.date}
          excerpt={node.excerpt}
        />
      )}
    </div>
  )
}

export default BlogPostList