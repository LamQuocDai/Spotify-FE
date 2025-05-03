import {
  IconHome,
  IconSearch,
  IconArticle,
  IconLogout,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const reloadPage = () => {
    window.location.reload();
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage khi component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Xóa token và thông tin người dùng khỏi localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    // Đặt lại trạng thái user
    setUser(null);
    // Điều hướng về trang đăng nhập thay vì làm mới trang
    navigate("/login");
  };

  return (
    <div className="flex h-[10vh] flex-row items-center text-white bg-black">
      <div className="flex flex-1 flex-row w-full items-center">
        <img
          className="h-14 cursor-pointer"
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          onClick={() => reloadPage()}
        />
        <IconHome
          stroke={2}
          className="mx-2 bg-[#272727] cursor-pointer size-11 border-none bg p-2 rounded-full"
          onClick={() => reloadPage()}
        />

        <div className="flex flex-1 flex-row bg-[#272727] px-4 py-2 items-center rounded-full">
          <IconSearch stroke={2} className="size-7" />
          <input
            type="text"
            className="flex-1 mx-2 bg-[#272727] border-r border-white"
          />
          <IconArticle stroke={2} className="size-6 cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-row flex-1 items-center justify-end">
        <div className="flex flex-row mx-4 items-center">
          {user ? (
            <>
              <img
                src={user.avatar || "https://via.placeholder.com/30"}
                alt="User avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-md mx-2 font-bold text-white cursor-pointer">
                {user.first_name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-md mx-2 font-bold text-gray-400 cursor-pointer hover:text-white"
              >
                <IconLogout stroke={2} className="size-6 mr-1" />
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/signup">
                <span className="text-md mx-2 font-bold text-gray-400 cursor-pointer hover:text-white">
                  Đăng ký
                </span>
              </Link>
              <Link to="/login">
                <span className="py-3 px-4 ml-2 rounded-full bg-white text-black cursor-pointer">
                  Đăng nhập
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
