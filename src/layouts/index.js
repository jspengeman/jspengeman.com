import React from 'react'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import Header, { PageHeaderContent } from '../components/Header'
import Footer from '../components/Footer'
import theme from '../assets/theme'
import '../assets/syntax.css'

injectGlobal`
  body {
    background-color: #F2F2F2;
  }
`

// TODO: May want to move this component?
export const Foreground = styled.section`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  border-radius: 3px;
  width: 100%;
  margin: -45px auto 45px auto;
  padding: 25px;
  max-width: 95%;
  display: block;
  position: relative;
  overflow: hidden;
  @media (min-width: 1000px) {
    max-width: 960px;
    padding: 65px 45px;
  }
`

// TODO: This name is super verbose? (Best way to do this?)
const ForegroundWithPagination = Foreground.extend`
  padding: 25px 25px 70px 25px;
  @media (min-width: 1000px) {
    padding: 55px 45px 100px 45px;
  }
`

export default ({ children, data }) => {
  const social = data.site.siteMetadata.social
  const title = data.site.siteMetadata.title
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header>
          <PageHeaderContent title={title} />
        </Header>
        <ForegroundWithPagination>{children()}</ForegroundWithPagination>
        <Footer social={social} />
      </div>
    </ThemeProvider>
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
