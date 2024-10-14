import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const PostLayout = () => {
  return (
    <>
      <ul>
        <h1>Post layout</h1>
        <li>
          <Link to="/postpage/1">post 1</Link>
        </li>{" "}
        <li>
          <Link to="/postpage/2">post 2</Link>
        </li>{" "}
        <li>
          <Link to="/postpage/3">post 3</Link>
        </li>
        <li>
          <Link to="/postpage/newpost">New Post</Link>
        </li>
      </ul>

      <Outlet />
    </>
  );
}

export default PostLayout