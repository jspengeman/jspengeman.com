import React, { Component } from 'react'
import styled from 'styled-components'
import BlogPost from './BlogPost'
import Pagination from './Pagination'

const CenterText = styled.div`
  text-align: center
`

class BlogPostList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 0,
      offset: 0,
      limit: 5,
      numberOfPages: Math.ceil(props.posts.length / 5)
    }

    this.onPageSelect = this.onPageSelect.bind(this)
    this.getPostsByPage = this.getPostsByPage.bind(this)
  }

  onPageSelect(currentPage) {
    const offset = currentPage * this.state.limit
    this.setState({currentPage, offset})
  }

  getPostsByPage(posts) {
    return posts.slice(
      this.state.offset, 
      this.state.offset + this.state.limit)
  }

  render() {
    const posts = this.getPostsByPage(this.props.posts)
    return (
      <div>
        <CenterText>
          {posts.map(({ node }) =>
            <BlogPost 
              key={node.slug}
              slug={node.slug}
              title={node.title}
              date={node.date}
              excerpt={node.content.childMarkdownRemark.excerpt}
            />
          )}
        </CenterText>
        <Pagination 
          currentPage={this.state.currentPage}
          numberOfPages={this.state.numberOfPages}
          onPageSelect={this.onPageSelect}
        />
      </div>
    )
  }
}

export default BlogPostList