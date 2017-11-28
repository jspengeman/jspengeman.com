import React from 'react'
import TwitterIcon from 'react-icons/lib/ti/social-twitter'
import LinkedInIcon from 'react-icons/lib/ti/social-linkedin'
import MailIcon from 'react-icons/lib/ti/mail'
import GithubIcon from 'react-icons/lib/ti/social-github'
import RSSIcon from 'react-icons/lib/ti/rss'

const Footer = ({ social }) => {
  const year = new Date().getFullYear()
  return (
    <footer>
      <span className='copy'>&copy; {year} - Jonathan Spengeman</span>
      <ul className='social-nav'>
        <li>
          <a href='/atom.xml'>
            <RSSIcon />
          </a>
        </li>
        <li>
          <a href={`mailto:${social.email}`}>
            <MailIcon />
          </a>
        </li>
        <li>
          <a href={social.twitter}>
            <TwitterIcon />
          </a>
        </li>
        <li>
          <a href={social.linkedin}>
            <LinkedInIcon />
          </a>
        </li>
        <li>
          <a href={social.github}>
            <GithubIcon />
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer