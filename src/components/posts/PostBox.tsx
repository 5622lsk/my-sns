import { PostProps } from 'pages/home/HomePage'
import React from 'react'
import { FaHeart, FaRegComment, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'


interface PostBoxProps {
    post: PostProps;
}

export default function PostBox({post}: PostBoxProps) {
const handleDelete = () => {}

  return (
      <div className='post__box' key={post?.id}>
            <Link to = {`/posts/${post?.id}`}>
              <div className='post__box-profile'>
                <div className='post__flex'>
                  {
                  post?.profileUrl ? (
                  <img className='post__box-profile-img' src={post?.profileUrl} alt="profile" /> ) : (
                  <FaUserCircle className='post__box-profile-icon'/> )
                  }
                  <div className='post__email'>{post?.email}</div>
                  <div className='post__createdAt'>{post?.createdAt}</div>
                </div>
                <div className='post__box-content'>{post?.content}</div>
              </div>
            </Link>
            <div className='post__box-footer'>
              {/* {post.uid === user.uid일때} */}
              <>
                <button 
                  type="button"
                  className='post__delete' 
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button 
                  type="button"
                  className='post__edit' 
                  onClick={handleDelete}
                >
                <Link to={`/posts/edit/${post?.id}`} />
                  Edit
                </button>
                <button 
                type="button"
                className='post__like' 
                onClick={handleDelete}
              >
                <FaHeart />
                {post?.likeCount || 0}
              </button>
              <button 
                type="button"
                className='post__comment' 
                onClick={handleDelete}
              >
                <FaRegComment />
                {post?.comment || 0}
              </button>
              </>
            </div>
          </div>
  )
}
