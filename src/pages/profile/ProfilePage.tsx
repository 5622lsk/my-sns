import PostBox from "components/posts/PostBox";
import AuthContext from "context/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home/HomePage";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PROFILE_DEFAULT_URL = "/logo.svg";

type TabType = "my" | "like";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("my"); //디폴트는 나의글로
  const [myposts, setMyPosts] = useState<PostProps[]>([]);
  const [likePosts, setLikePosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext); //사용자가 있을때만 호출
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      const mypostsQuery = query(
        postsRef,
        where("uid", "==", user.uid), //현재 uid가 로그인된 사용자 uid와 같을때만. 내가 쓴글만 보여주기
        orderBy("createdAt", "desc")
      );
      const likepostsQuery = query(
        postsRef,
        where("likes", "array-contains", user.uid), //현재 uid가 로그인된 사용자 uid와 같을때만. 내가 쓴글만 보여주기
        orderBy("createdAt", "desc")
      );

      onSnapshot(mypostsQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setMyPosts(dataObj as PostProps[]);
      });
      onSnapshot(likepostsQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setLikePosts(dataObj as PostProps[]);
      });
    }
  }, [user]);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">Profile</div>
        <div className="profile">
          <img
            src={user?.photoURL || PROFILE_DEFAULT_URL}
            alt="profile"
            className="profile__image"
            width={100}
            height={100}
          />
          <button
            type="button"
            className="profile__btn"
            onClick={() => navigate("/profile/edit")}
          >
            프로필 수정
          </button>
        </div>
        <div className="profile__text">
          <div className="profile__name">{user?.displayName || "사용자님"}</div>
          <div className="profile__email">{user?.email || ""}</div>
        </div>
        <div className="home__tabs">
          <div
            className={`home__tab ${activeTab === "my" && "home__tab--active"}`}
            onClick={() => setActiveTab("my")}
          >
            나의 게시글
          </div>
          <div
            className={`home__tab ${
              activeTab === "like" && "home__tab--active"
            }`}
            onClick={() => {
              setActiveTab("like");
            }}
          >
            좋아요한 게시글
          </div>
        </div>
        {activeTab === "my" && (
          <div className="post">
            {myposts?.length > 0 ? (
              myposts?.map((post) => <PostBox post={post} key={post.id} />)
            ) : (
              <div className="post__no-posts">
                <div className="post__text">게시글이 없습니다.</div>
              </div>
            )}
          </div>
        )}
        {activeTab === "like" && (
          <div className="post">
            {likePosts?.length > 0 ? (
              likePosts?.map((post) => <PostBox post={post} key={post.id} />)
            ) : (
              <div className="post__no-posts">
                <div className="post__text">게시글이 없습니다.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
