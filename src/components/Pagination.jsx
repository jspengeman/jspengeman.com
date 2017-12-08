import React from 'react'
import styled from 'styled-components'
import ChevronRight from 'react-icons/lib/fa/chevron-right'
import ChevronLeft from 'react-icons/lib/fa/chevron-left'

const PaginationWrapper = styled.section`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${props => props.theme.colors.accent};
  line-height: 45px;
  font-size: 12px;
`

const PageButton = styled.a`
  color: #fff;
  font-weight: ${props => props.active ? 600 : 300};
  padding:0 3px;
  display: inline-block;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  &:visited {
    color: #fff;
  }
  @media (min-width: 960px) {
    font-size: 16px;
  }
`

const ArrowButton = PageButton.extend`
  display: block;
  position: absolute;
  bottom: 0;
  line-height: 45px;
  text-align: center;
  width: 45px;
  padding: 0;
  &:hover {
    background-color: rgba(250,250,250,0.1);
    opacity: 1;
  }
`

const NextButton = ArrowButton.extend`
  right: 0;
  box-shadow: 1px 0 rgba(0,0,0,0.1) inset;
  &:active {
    box-shadow: -1px 0 rgba(0,0,0,0.1) inset, 0 3px 3px rgba(0,0,0,0.2) inset;
    background-color: rgba(0,0,0,0.1);
  }
`

const PrevButton = ArrowButton.extend`
  left: 0;
  box-shadow: -1px 0 rgba(0,0,0,0.1) inset;
  &:active {
    box-shadow: 1px 0 rgba(0,0,0,0.1) inset, 0 3px 3px rgba(0,0,0,0.2) inset;
    background-color: rgba(0,0,0,0.1);
  }
`

const Pagination = (props) => {
  const { 
    currentPage,
    numberOfPages,
    onPageSelect 
  } = props
  const range = (amount) => Array.from(Array(amount).keys())
  return (
    <PaginationWrapper>
      {currentPage !== 0 &&
        <PrevButton onClick={() => onPageSelect(currentPage - 1)}> 
          <ChevronLeft /> 
        </PrevButton>}
      
      {range(numberOfPages).map(page => {  
        return (
          <PageButton 
            key={page} 
            onClick={() => onPageSelect(page)}
            active={page === currentPage}
          > 
            {page + 1} 
          </PageButton>
        )
      })}

      {currentPage + 1 !== numberOfPages &&
        <NextButton onClick={() => onPageSelect(currentPage + 1)}> 
          <ChevronRight />
        </NextButton>}
    </PaginationWrapper>
  )
}

/*      
*/
export default Pagination