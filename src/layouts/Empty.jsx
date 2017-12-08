import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../assets/theme'

/**
 * Empty layout. This allows all other pages
 * to use the index layout while allowing me
 * to specify a layout that is not the index
 * so that the BlogPost template can be used
 * in a way that will not duplicate a header.
 */
export default ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        {children()}
      </div>
    </ThemeProvider>
  )
}