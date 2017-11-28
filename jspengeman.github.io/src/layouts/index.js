import React from 'react'
import Header from './Header'
import Footer from './Footer'
import '../assets/app.scss'
import '../assets/syntax.scss'

export default ({ children, data }) => {
  return (
    <div>
      <Header title={data.site.siteMetadata.title} />
      <section className='foreground index-list has-pagination'>
        {children()}
      </section>
      <Footer social={data.site.siteMetadata.social} />
    </div>
  )
}

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        social {
          email
          twitter
          linkedin
          github
        }
      }
    }
  }
`