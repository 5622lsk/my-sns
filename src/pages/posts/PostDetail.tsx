import Loader from "components/loader/Loader";
import PostBox from "components/posts/PostBox";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home/HomePage";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostHeader from "components/posts/PostHeader";
import CommentForm from "components/comments/CommentForm";
import CommentBox, { CommentProps } from "components/comments/CommentBox";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  //초기에는 포스트 정보가 없는 상태지만,데이터를 받아오면 해당 포스트 정보를 설정할 수 있음.
  const params = useParams();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      onSnapshot(docRef, (doc) => {
        setPost({ ...(doc?.data() as PostProps), id: doc.id });
      });
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost, params.id]);

  return (
    <div className="post">
      <PostHeader />
      {post ? (
        <>
          <PostBox post={post} />
          <CommentForm post={post} />
          {post?.comments
            ?.slice(0)
            ?.reverse() //댓글을 시간순이 아닌 반대로 배열
            ?.map((data: CommentProps, index: number) => (
              <CommentBox data={data} key={index} post={post} />
            ))}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
