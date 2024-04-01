import AuthContext from 'context/AuthContext';
import React, { useContext } from 'react'
import { BsHouse } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom'


export default function MenuList() {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);
  return (
    <div className='footer'>
      <div className='footer__grid'>
        <button type="button" onClick={() => navigate("/")}>
          <BsHouse />
          Home
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          <FaRegUserCircle />
          Profile
        </button> 
        {user === null ? (
          <button type="button" onClick={() => navigate("/users/login")}>
          <MdOutlineLogin />
          Login
        </button> 
        ) : (<button type="button" onClick={() => navigate("/logout")}>
        <MdOutlineLogout />
          Logout
        </button> )
        }
      </div>
    </div>
  )
}
