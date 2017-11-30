import React from 'react'
import Header, { PageHeaderContent } from './Header'
import Footer from './Footer'
import '../assets/app.scss'
import '../assets/syntax.scss'

export default ({ children, data } ) => {
  const social = data.site.siteMetadata.social
  const title = data.site.siteMetadata.title
  return (
    <div>
      <Header>
        <PageHeaderContent title={title} /> 
      </Header>
      <section className='foreground index-list has-pagination'>
        {children()}
      </section>
      <Footer social={social} />
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