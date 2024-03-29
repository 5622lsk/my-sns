import HomePage from 'pages/home/HomePage'
import NotificationPage from 'pages/notification/NotificationPage'
import PostDetail from 'pages/posts/PostDetail'
import PostEdit from 'pages/posts/PostEdit'
import PostNew from 'pages/posts/PostNew'
import ProfileEdit from 'pages/profile/ProfileEdit'
import ProfilePage from 'pages/profile/ProfilePage'
import SearchPage from 'pages/search/SearchPage'
import LoginPage from 'pages/users/LoginPage'
import SignupPage from 'pages/users/SignupPage'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

interface RouterProps{
  isAuthenticated: boolean;
}


export default function Router({isAuthenticated}: RouterProps) {
  return (
    <Routes>
      {isAuthenticated ? (
      <>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/posts/new" element={<PostNew />} />
      <Route path="/posts/edit/:id" element={<PostEdit />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />
      <Route path="/notification" element={<NotificationPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/users/login" element={<LoginPage />} />
      <Route path="/users/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate replace to="/" /> } />
      </>
      ) : (
      <>
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="/users/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate replace to="/users/login" /> } />
      </>  
      )}
    </Routes>
  )
}
