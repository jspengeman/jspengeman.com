import React from 'react'
import Link from 'gatsby-link'
import avatar from '../assets/avatar.jpg'

const Header = ({ title }) => {
  // TODO: How will I change header type?
  return (
    <section className='heading'>
      <ul className='main-nav'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>
      <section className='heading-content'>
        <Link className='home-link' to='/'>
          <img className='heading-logo' src={avatar} alt={title} />
        </Link>
        <h1> {title} </h1>
        <h2> Software Engineer </h2>
      </section>
    </section>
  )
}

export default Header