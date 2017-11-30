import React from 'react'
import Link from 'gatsby-link'
import avatar from '../assets/avatar.jpg'

export const PostHeaderContent = ({ title, date }) => {
  return (
    <section className="heading-content">
      <Link className='home-link' to='/'>
        <img className="heading-logo" src={avatar} alt='avatar' />
      </Link>
      <h1> {title} </h1>
      <div className="line-date">
        <span> {date} </span>
      </div>
    </section>
  )
}

export const PageHeaderContent = ({ title }) => {
  return (
    <section className='heading-content'>
      <Link className='home-link' to='/'>
        <img className='heading-logo' src={avatar} alt='avatar' />
      </Link>
      <h1> {title} </h1>
      <h2> Software Engineer </h2>
    </section>
  )
}

const Header = ({ children }) => {
  return (
    <section className='heading'>
      <ul className='main-nav'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>
      {children}
    </section>
  )
}

export default Header