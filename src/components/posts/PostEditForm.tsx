import { useCallback, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FiImage } from "react-icons/fi";
import { db } from "firebaseApp";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { PostProps } from "pages/home/HomePage";

export default function PostEditForm() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>("");
  const [hashTag, setHashTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>(['태그','태그2','태그3']);//성공적으로 저장한 태그들
  const navigate = useNavigate();
  const handleFileUpload = () => {};
 
  //useEffect로 페이지가 로드될 때 호출되는 함수
  const getPost = useCallback(async() => {
    if(params.id){
        const docRef = doc(db, "posts", params.id);
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data(), docSnap.id);
        setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
        setContent(docSnap?.data()?.content);
        setTags(docSnap?.data()?.hashTags); //editpost폼에 태그 불러오기
    }
  },[params.id])

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
        if(post){
            const postRef = doc(db, "posts", post?.id);
            await updateDoc(postRef, {
                content: content,
                hashTags: tags, //수정 업데이트
            });
            navigate(`/posts/${post?.id}`);
        }
      toast.success("게시글을 수정했습니다.");
    } catch (e: any) {
    //   console.log(e);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "content") {
      setContent(value);
    }
  };

  useEffect(() => {
    if (params.id) getPost()
  }, [getPost, params.id]);

  const onChangeHashTag = (e: any) => {
    setHashTag(e?.target?.value?.trim());
  }

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 32 && e.target.value.trim() !== '') { //32: 스페이스바 //trim:양쪽 공백제거
      if(tags?.includes(e.target.value?.trim())) {
        toast.error("같은 태그가 있습니다.")
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag(""); //입력창 초기화
      }
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags?.filter((val) => val !== tag));
  };

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__textarea"
        required
        name="content"
        id="content"
        placeholder="What is happening?"
        onChange={onChange}
        value={content}
      />
      <div className="post-form__hashtags">
        <span className="post-form__hashtags-outputs">
        {tags?.map((tag, index) => (
          <span 
            className="post-form__hashtags-tag"
            key={index}
            onClick={() => removeTag(tag)}
          >
            #{tag}
          </span>
        ))}
        </span>
        <input 
          className="post-form__input"
          name="hashtag"
          id="hashtag"
          placeholder="해시태그 + 스페이스바 입력"
          onChange={onChangeHashTag}
          onKeyUp={handleKeyUp} //키보드의 키를 놓았을 때 발생하는 이벤트
          value={hashTag} //지금현재 입력하고있는 해쉬태그 상태
        />
      </div>
      <div className="post-form__submit-area">
        <label htmlFor="file-input" className="post-form__file">
          <FiImage className="post-form__file-icon" />
        </label>
        <input
          type="file"
          name="file-input"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <input type="submit" value="Edit" className="post-form__submit-btn" />
      </div>
    </form>
  );
}