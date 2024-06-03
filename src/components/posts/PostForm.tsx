import { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { FiImage } from "react-icons/fi";
import { db, storage } from "firebaseApp";

import { toast } from "react-toastify";
import AuthContext from "context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useTranslation from "hooks/useTranslation";

export default function PostForm() {
  const [content, setContent] = useState<string>("");
  const [hashTag, setHashTag] = useState<string>("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>(["태그", "태그2", "태그3"]); //성공적으로 저장한 태그들
  const { user } = useContext(AuthContext);
  const t = useTranslation();

  const handleFileUpload = (e: any) => {
    const {
      target: { files },
    } = e;

    const file = files?.[0];
    const fileReader = new FileReader(); //fileReader 선언
    fileReader?.readAsDataURL(file); //fileReader가 파일 읽어오도록

    fileReader.onloadend = (e: any) => {
      const { result } = e?.currentTarget;
      setImageFile(result);
    };
  };

  const handleDeleteImage = () => {
    setImageFile(null);
  };

  const onSubmit = async (e: any) => {
    setIsSubmitting(true);
    const key = `${user?.uid}/${uuidv4()}`; //user의 uid별로 고유 키값 만들기
    const storageRef = ref(storage, key);
    e.preventDefault();

    try {
      //이미지 먼저 업로드
      let imageUrl = "";
      //uploadString매서드 활용
      if (imageFile) {
        const data = await uploadString(storageRef, imageFile, "data_url");
        imageUrl = await getDownloadURL(data?.ref);
      }
      //업로드된 이미지의 download url 업데이트
      await addDoc(collection(db, "posts"), {
        content: content,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        uid: user?.uid,
        email: user?.email,
        hashTags: tags,
        imageUrl: imageUrl,
      });
      setTags([]);
      setContent("");
      toast.success("게시글을 생성했습니다.");
      setImageFile(null); //이미지 업로드 하고 다시 null값으로
      setIsSubmitting(false);
    } catch (e: any) {
      console.log(e);
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

  const onChangeHashTag = (e: any) => {
    setHashTag(e?.target?.value?.trim());
  };

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 32 && e.target.value.trim() !== "") {
      //32: 스페이스바 //trim:양쪽 공백제거
      if (tags?.includes(e.target.value?.trim())) {
        toast.error("같은 태그가 있습니다.");
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag(""); //입력창 초기화
      }
    }
  };

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
        placeholder={t("POST_PLACEHOLDER")}
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
          placeholder={t("POST_HASHTAG")}
          onChange={onChangeHashTag}
          onKeyUp={handleKeyUp}
          value={hashTag}
        />
      </div>
      <div className="post-form__submit-area">
        <div className="post-form__image-area">
          <label htmlFor="file-input" className="post-form__file">
            <FiImage className="post-form__file-icon" />
          </label>
          <input
            type="file"
            name="file-input"
            id="file-input"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          {imageFile && (
            <div className="post-form__attachment">
              <img src={imageFile} alt="attachment" width={100} height={100} />
              <button
                className="post-form__clear-btn"
                type="button"
                onClick={handleDeleteImage}
              >
                {t("BUTTON_DELETE")}
              </button>
            </div>
          )}
        </div>
        <input
          type="submit"
          value="Tweet"
          className="post-form__submit-btn"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
