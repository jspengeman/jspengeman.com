import React from 'react'
import styled from 'styled-components'
import TwitterIcon from 'react-icons/lib/ti/social-twitter'
import LinkedInIcon from 'react-icons/lib/ti/social-linkedin'
import MailIcon from 'react-icons/lib/ti/mail'
import GithubIcon from 'react-icons/lib/ti/social-github'
import RSSIcon from 'react-icons/lib/ti/rss'

const FooterWrapper = styled.footer`
  text-align: center;
  color: #aaa;
`

const Copyright = styled.span`
  font-size: 18px;
  font-weight: 700;
`

const SocialIcons = styled.ul`
  margin: 15px 0 25px 0;
`

const SocialIcon = styled.li`
  display: inline-block;
`

const SocialLink = styled.a`
  display: block;
  padding: 3px 12px;
  color: #aaa;
  font-size: 28px;
  &:hover {
    color: $accent-color;
    text-decoration: none;
  }
`

// TODO: Little bit of duplicate code blocks below.
const Footer = ({ social }) => {
  const year = new Date().getFullYear()
  return (
    <FooterWrapper>
      <Copyright>&copy; {year} - Jonathan Spengeman</Copyright>
      <SocialIcons>
        <SocialIcon>
          <SocialLink href='/atom.xml'>
            <RSSIcon />
          </SocialLink>
        </SocialIcon>
        <SocialIcon>
          <SocialLink href={`mailto:${social.email}`}>
            <MailIcon />
          </SocialLink>
        </SocialIcon>
        <SocialIcon>
          <SocialLink href={social.twitter}>
            <TwitterIcon />
          </SocialLink>
        </SocialIcon>
        <SocialIcon>
          <SocialLink href={social.linkedin}>
            <LinkedInIcon />
          </SocialLink>
        </SocialIcon>
        <SocialIcon>
          <SocialLink href={social.github}>
            <GithubIcon />
          </SocialLink>
        </SocialIcon>
      </SocialIcons>
    </FooterWrapper>
  )
}

export default Footer