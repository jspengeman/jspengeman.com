import React from 'react'
import Link from "gatsby-link"

import '../assets/app.scss'
import '../assets/syntax.scss'
import avatar from '../assets/avatar.jpg'

const Header = ({ title }) => {
  // TODO: How will I change header type?
  return (
    <section className="heading">
      <ul className="main-nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <section className="heading-content">
        <Link className="home-link" to="/">
          <img className="heading-logo" src={avatar} alt={title} />
        </Link>
        <h1> {title} </h1>
        <h2> Software Engineer </h2>
      </section>
    </section>
  )
}

export default ({ children, data }) => {
  return (
    <div>
      <Header title={data.site.siteMetadata.title} />
      <section className="foreground index-list has-pagination">
        {children()}
      </section>
    </div>
  )
}

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`