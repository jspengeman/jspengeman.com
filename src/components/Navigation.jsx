import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

// TODO: This component does not look like master at the moment.
const List = styled.ul`
  margin-bottom: 0px;
  margin-left: 0px;
`

const ListItem = styled.li`
  display: inline-block;
`

const StyledLink = styled(Link)`
  padding: 8px 12px;
  color: #fff;
  display: inline-block;
  text-decoration: none;
  transition: all 0.2s ease-out;
  border-radius: 3px;
  &:hover {
    text-decoration: none;
    color: #fff;
    opacity: 0.8;
  }
  &:active {
    background-color: rgba(250,250,250,0.2);
  }
  &:visited {
    color: #fff;
  }
`

const Navigation = () => {
  return (
    <List>
      <ListItem>
        <StyledLink to='/'>Home</StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink to='/about'>About</StyledLink>
      </ListItem>
    </List>
  )
}

export default Navigation