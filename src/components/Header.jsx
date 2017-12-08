import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import avatar from '../assets/avatar.jpg'
import PostDate from './PostDate'
import Navigation from './Navigation'

const HeaderContent = styled.section`
  display: block;
  background-color: ${props => props.theme.colors.main};
  text-align: center;
  padding: 25px 0 85px 0;
  color: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  border-top: 7px solid ${props => props.theme.colors.accent};
`

const Title = styled.h1`
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 2px;

  @media (min-width: 760px) {
    font-size: 26px;
  }
`

const SubTitle = styled.h2`
  font-weight: 400;
  font-size: 14px;
  margin-top: 15px;

  @media (min-width: 760px) {
    font-size: 18px;
  }
`

const AvatarLink = styled(Link)`
  transition: 0.2s all ease-out;
  &:hover {
    opacity: 0.8;
  }
`

const Avatar = styled.img`
  border: 2px solid #fff;
  border-radius: 50%;
  max-width: 64px;
  margin-bottom: 8px;

  @media (min-width: 760px) {
    max-width: 100px;
    margin-bottom: 20px;
	}
`

export const PostHeaderContent = ({ title, date }) => {
  return (
    <section>
      <AvatarLink to='/'>
        <Avatar src={avatar} alt='avatar' />
      </AvatarLink>
      <Title> {title} </Title>
      {date}
    </section>
  )
}

export const PageHeaderContent = ({ title }) => {
  return (
    <section>
      <AvatarLink to='/'>
        <Avatar src={avatar} alt='avatar' />
      </AvatarLink>
      <Title> {title} </Title>
      <SubTitle> Software Engineer </SubTitle>
    </section>
  )
}

const Header = ({ children }) => {
  return (
    <HeaderContent>
      <Navigation />
      {children}
    </HeaderContent>
  )
}

export default Header