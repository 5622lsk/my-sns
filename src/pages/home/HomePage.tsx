import React from 'react'
import { Link } from 'react-router-dom';
import { FiImage } from "react-icons/fi";
import { FaUserCircle, FaHeart, FaRegComment  } from "react-icons/fa";

const posts: PostProps[] = [
{
  id: "1",
  email:"test@naver.com",
  content:"contenttest",
  createdAt:"2024.03.27",
  uid:"123123"
},
{
  id: "2",
  email:"test@naver.com",
  content:"contenttest",
  createdAt:"2024.03.27",
  uid:"123123"
},
{
  id: "3",
  email:"test@naver.com",
  content:"contenttest",
  createdAt:"2024.03.27",
  uid:"123123"
},
{
  id: "4",
  email:"test@naver.com",
  content:"contenttest",
  createdAt:"2024.03.27",
  uid:"123123"
}
]


export interface PostProps{
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  like?: string[];
  likeCount?: number;
  comment?: any;
}


export default function HomePage() {
  const handleFileUpload = () => {}
  const handleDelete = () => {}
  return (
    <div className='home'>
      <div className='home__title'>Home</div>
      <div className='home__tabs'>
        <div className='home__tab home__tab--active'>For You</div>
        <div className='home__tab home__tab'>Following</div>
      </div>

      {/* post form */}
      <form className='post-form'>
        <textarea 
          className="post-form__textarea"
          name="content"
          id="content"
          placeholder='write your story'
          required
        />
        <div className="post-form__submit-area">
          <label htmlFor='file-input' className="post-form__file">
            <FiImage className='post-form__file-icon' />
          </label>
          <input 
            type="file"
            name="file-input"
            accept="image/*"
            onChange={handleFileUpload}
            className='hidden'
          />
          <input
            type="submit" 
            value="post" 
            className="post-form__submit-btn" />
        </div>
      </form>

      {/* upload posts */}
      <div className='post'>
        {posts?.map((post) => (
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
        ))}
      </div>

    </div>
  )
}

