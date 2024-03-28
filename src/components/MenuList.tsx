import React from 'react'
import { BsHouse } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom'


export default function MenuList() {
  const navigate = useNavigate();

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
        <button type="button" onClick={() => navigate("/logout")}>
        <MdOutlineLogout />
          Logout
        </button>
      </div>
    </div>
  )
}
