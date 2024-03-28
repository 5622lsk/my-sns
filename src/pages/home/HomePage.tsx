import React from 'react'
import { Link } from 'react-router-dom';
import MenuList from 'components/MenuList';
import PostForm from 'components/posts/PostForm';
import PostBox from 'components/posts/PostBox';

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

  return (
    <div className='home'>
      <div className='home__title'>Home</div>
      <div className='home__tabs'>
        <div className='home__tab home__tab--active'>For You</div>
        <div className='home__tab home__tab'>Following</div>
      </div>

      <PostForm />
      {/* upload posts */}
      <div className='post'>
        {posts?.map((post) => (
          <PostBox post={post} key={post.id}/>
        ))}
      </div>
      <MenuList />

    </div>
  )
}

