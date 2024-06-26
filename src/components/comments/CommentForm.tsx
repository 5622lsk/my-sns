import React, { useContext, useState } from "react";
import { PostProps } from "pages/home/HomePage";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";
import useTranslation from "hooks/useTranslation";

export interface CommentFormProps {
  post: PostProps | null;
}

export default function CommentForm({ post }: CommentFormProps) {
  const [comment, setComment] = useState<string>("");
  const { user } = useContext(AuthContext);
  const t = useTranslation();

  //글 잘라주는 함수
  const truncate = (str: string) => {
    return str?.length > 10 ? str?.substring(0, 10) + "..." : str;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (post && user) {
      const postRef = doc(db, "posts", post?.id);

      const commentObj = {
        comment: comment,
        uid: user?.uid,
        email: user?.email,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };

      await updateDoc(postRef, {
        comments: arrayUnion(commentObj),
      });

      //댓글 생성 알림
      if (user?.uid !== post?.uid) {
        //댓글 단 유저가 게시글의 유저와 uid가 다를때 알림생성
        await addDoc(collection(db, "notification"), {
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          uid: post?.uid,
          isRead: false,
          url: `/posts/${post?.id}`,
          content: `"${truncate(post?.content)}" 글에 댓글이 작성되었습니다.`,
        });
      }

      toast.success("댓글을 생성했습니다");
      setComment("");
      try {
      } catch (e: any) {
        console.log(e);
      }
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  };
  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__textarea"
        name="comment"
        id="comment"
        placeholder={t("POST_PLACEHOLDER")}
        onChange={onChange}
        value={comment}
        required
      />
      <div className="post-form__submit-area">
        <div />
        <input
          type="submit"
          value={t("BUTTON_COMMENT")}
          className="post-form__submit-btn"
          disabled={!comment} //코맨트가 없으면 비활성화
        />
      </div>
    </form>
  );
}
