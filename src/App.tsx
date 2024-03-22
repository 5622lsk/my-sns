import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>home page</h1>} />
      <Route path="/posts" element={<h1>posts</h1>} />
      <Route path="/posts/:id" element={<h1>detail</h1>} />
      <Route path="/posts/new" element={<h1>detail</h1>} />
      <Route path="/posts/edit/:id" element={<h1>detail</h1>} />
      <Route path="/profile" element={<h1>detail</h1>} />
      <Route path="/profile/edit" element={<h1>detail</h1>} />
      <Route path="/notification" element={<h1>detail</h1>} />
      <Route path="/search" element={<h1>detail</h1>} />
      <Route path="/users/login" element={<h1>detail</h1>} />
      <Route path="/users/signup" element={<h1>detail</h1>} />
      <Route path="*" element={<Navigate replace to="/" /> } />
    </Routes>
  );
}

export default App;
