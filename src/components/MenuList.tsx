import { BsHouse } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdLogout, MdLogin } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import useTranslation from "hooks/useTranslation";

import { toast } from "react-toastify";

export default function MenuList() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const t = useTranslation();

  return (
    <div className="footer">
      <div className="footer__grid">
        <button type="button" onClick={() => navigate("/")}>
          <BsHouse />
          {t("MENU_HOME")}
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          <BiUserCircle />
          {t("MENU_PROFILE")}
        </button>
        <button type="button" onClick={() => navigate("/search")}>
          <FaSearch />
          {t("MENU_SEARCH")}
        </button>
        <button type="button" onClick={() => navigate("/notification")}>
          <IoMdNotificationsOutline />
          {t("MENU_NOTI")}
        </button>
        {user === null ? (
          <button type="button" onClick={() => navigate("/users/login")}>
            <MdLogin />
            {t("MENU_LOGIN")}
          </button>
        ) : (
          <button
            type="button"
            onClick={async () => {
              const auth = getAuth(app);
              await signOut(auth);
              toast.success("로그아웃 되었습니다.");
            }}
          >
            <MdLogout />
            {t("MENU_LOGOUT")}
          </button>
        )}
      </div>
    </div>
  );
}
