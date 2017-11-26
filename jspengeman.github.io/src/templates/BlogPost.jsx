import React from "react"

const BlogPost = ({ data }) => {
  const post = data.markdownRemark
  return (
    <div>
      <section className="markup-area">
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <section className="comments"> </section>
      </section>
    </div>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default BlogPost