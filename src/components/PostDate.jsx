import React from 'react'
import styled from 'styled-components'

const DateContent = styled.div`
  display: block;
  position: relative;
  width: 640px;
  max-width: 95%;
  margin: 15px auto;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    margin-top: -1px;
    height: 2px;
    width: 100%;
    background-color: ${props => props.theme.colors.accent};
    display: block;
  }
`

const DateElement = styled.span`
  z-index: 2;
  position: relative;
  background-color: ${
    props => props.invert ? props.theme.colors.main : '#fff'
  };
  height: 100%;
  padding: 0 12px;
  line-height: 36px;
  font-size: 18px;
  color: ${
    props => props.invert ? '#fff' : '#aaa'
  };
  display: inline-block;
  margin: 0 auto;
`

const PostDate = ({ date, invert }) => {
  const formatDate = (date) => {
    const options = {year: 'numeric', month: 'long',  day: 'numeric'}
    return new Date(date).toLocaleDateString("en-US", options)
  }

  return (
    <DateContent>
      <DateElement invert={invert}>{formatDate(date)}</DateElement>
    </DateContent>
  )
}

export default PostDate