import React from 'react'

const PostDate = ({ date }) => {
  const formatDate = (date) => {
    const options = {year: 'numeric', month: 'long',  day: 'numeric'}
    return new Date(date).toLocaleDateString("en-US", options)
  }

  return (
    <div className="line-date">
      <span>{formatDate(date)}</span>
    </div>
  )
}

export default PostDate