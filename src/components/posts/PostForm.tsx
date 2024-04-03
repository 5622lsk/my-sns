import React, { useContext, useState } from 'react';
import { FiImage } from "react-icons/fi";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from 'firebaseApp';
import { toast } from 'react-toastify';
import AuthContext from 'context/AuthContext';


export default function PostForm() {
  const [content, setContent] = useState<string>("")
  const {user} = useContext(AuthContext);
  const handleFileUpload = () => {};

  const onSubmit = async(e: any) => {
    e.preventDefault(); //폼이 일단 넘어가지 않도록

    try{
      await addDoc(collection(db, 'posts'),{
        content: content,
        cretedAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        uid: user?.uid,
        email: user?.email,
      })
      setContent("");//성공적으로 전송되면 콘텐츠 지움
      toast.success("게시글을 생성했습니다");
    } catch(e: any){
      console.log(e);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: {name, value}
    } = e;

    if (name === "content"){
      setContent(value);
    }
  };

  return (
    <form className='post-form' onSubmit={onSubmit}>
      <textarea 
        className="post-form__textarea"
        name="content"
        id="content"
        placeholder='write your story'
        onChange={onChange}
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
  );
}
