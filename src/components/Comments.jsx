import React from 'react'
import ReactDisqusComments from 'react-disqus-comments'

const Comments = ({ id, title, url }) => {
  return (
    <ReactDisqusComments
      shortname="jspengeman-com"
      identifier={id}
      title={title}
      url={url}
    />
  )
}

export default Comments
