import React from 'react'
import Posst from './Posst'

const Feed = ({posts}) => {
  return (
    <>
    {posts.map(post=>(
        <Posst key={post.id} post={post}/>
    ))}</>
  )
}

export default Feed