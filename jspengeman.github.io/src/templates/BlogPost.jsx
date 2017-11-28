import React from "react"

// TODO: Can I turn this into a generic MarkdownArea area some how?
const BlogPost = ({ data }) => {
  const html = data.contentfulBlogPost.content.childMarkdownRemark.html
  return (
    <div>
      <section className="markup-area">
        <div 
          dangerouslySetInnerHTML={{ __html: html }} 
        />
        <section className="comments"> </section>
      </section>
    </div>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default BlogPost