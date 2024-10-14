import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import { Route, Routes, useNavigate } from "react-router-dom";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import Footer from "./components/Footer";
import { format } from "date-fns";
// import api from "./api/posts";
import axios from "axios";
import Edit from "./components/Edit";
import useWindowSize from "./hooks/useWindowSize";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postTitle, setPostTitle] = useState("");
   const [editBody, setEditBody] = useState("");
   const [editTitle, setEditTitle] = useState("");
  const navigate = useNavigate();
 const {width}=useWindowSize();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3500/posts");
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchPosts();
  }, []);


  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    
    try{
      const response = await axios.post(`http://localhost:3500/posts/`,newPost);
      const allPosts = [...posts,response.data];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    navigate("/");
    }
    catch(err){
         console.log(`Error: ${err.message}`);
    }
  };
    const handleEdit = async (id) => {
     const datetime = format(new Date(), "MMMM dd, yyyy pp");
      const updatedPost = { id, title: editTitle, datetime, body: editBody };

      try {
        const response = await axios.put(
          `http://localhost:3500/posts/${id}`,
          updatedPost
        );
        setPosts(posts.map((post)=>post.id===id?{...response.data}:post));
        setEditTitle("");
        setEditBody("");
        navigate("/");
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3500/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (err) {
        console.log(`Error: ${err.message}`);
      }
  };
  return (
    <div className="App">
      <Header title="dhuddu social media" width={width}/>
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="/post">
          <Route
            index
            element={
              <NewPost
                setPostBody={setPostBody}
                postBody={postBody}
                setPostTitle={setPostTitle}
                postTitle={postTitle}
                handleSubmit={handleSubmit}
              />
            }
          />

          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/edit/:id" element={<Edit posts={posts} setEditTitle={setEditTitle} setEditBody={setEditBody} handleEdit={handleEdit} editTitle={editTitle} editBody={editBody}/>} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
