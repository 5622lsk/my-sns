import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { app } from 'firebaseApp';
import { toast } from 'react-toastify';


export default function SignupForm() {
    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const navigate = useNavigate();

    const onSubmit = async (e:any) => {
        e.preventDefault(); //제출되지 않도록 막음
        try {
            const auth = getAuth(app);
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/");
            toast.success("성공적으로 회원가입이 완료됐습니다.")
        } catch (error: any){
            toast.error(error?.code);
        };
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value},
        } = e;

        if (name === "email"){
            setEmail(value);
            const validRegex =
            /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;

            if(!value?.match(validRegex)){
                setError("이메일 형식이 올바르지 않습니다.");
            }
        }

        if (name === "password"){
            setPassword(value);

            if(value?.length < 8){
                setError("비밀번호는 8자리 이상 입략해주세요.");
            } else {
                setError("");
            }
        }

        if (name === "password_confirmation"){
            setPasswordConfirmation(value);

            if(value?.length < 8){ 
                setError("비밀번호는 8자리 이상 입략해주세요.");
            } else if (value !== password){
                setError("비밀번호와 비밀번호 확인값이 다릅니다.")
            } else {
                setError("");
            }
        }
    };

    const onClickSocialLogin = async (e: any) => {
        const {
          target: {name},
    } = e;

    let provider;
    const auth = getAuth(app);

    if (name === "google"){
        provider = new GoogleAuthProvider();
    }

    if (name === "github"){
        provider = new GithubAuthProvider();
    }

    await signInWithPopup(
        auth,
        provider as GithubAuthProvider | GoogleAuthProvider
        )
        .then((result) => {
            console.log(result);
            navigate("/");
            toast.success("로그인 됐습니다.");
        }).catch((error) => {
            console.log(error);
            const errorMessege = error?.message;
            toast?.error(errorMessege);
        });
    };

  return (
    <form className='form form--lg' onSubmit={onSubmit}>
        <div className='form__title'>회원가입</div>
        <div className='form__block'>
            <label htmlFor="email">이메일</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
        </div>
        <div className='form__block'>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              required
            />
        </div>
        <div className='form__block'>
            <label htmlFor="password_confirmation">비밀번호 확인</label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              value={passwordConfirmation}
              onChange={onChange}
              required
            />
        </div>

        {/* 에러가 있다면 */}
        {error && error?.length > 0 && (
            <div className='form__block'>
                <div className='form__error'>{error}</div>
            </div>
        )}

        <div className='form__block'>
            계정이 있으신가요?
            <Link to = "/users/login" className='form__link'>로그인하기</Link>
        </div>
        <div className='form__block--lg'>
            <button
              type="submit"
              className='form__btn--submit'
              disabled={error?.length > 0}
            >
            회원가입
            </button>
        </div>
        <div className='form__block'>
            <button
              type="button"
              name='google'
              className='form__btn--google'
              onClick={onClickSocialLogin}
            >
            Sign up with Google
            </button>
        </div>
        <div className='form__block'>
            <button
              type="button"
              name='github'
              className='form__btn--github'
              onClick={onClickSocialLogin}
            >
            Sign up with GitHub
            </button>
        </div>
    </form>
  )
}
