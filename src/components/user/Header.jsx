import {
  IconHome,
  IconSearch,
  IconArticle,
  IconLogout,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchSongs } from "../../services/SongsService";
import ProfilePopup from "./ProfilePopup";

const Header = ({ setCurrentView, setListSongsDetail }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [showProfilePopup, setShowProfilePopup] = useState(false);

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

  const handleSearchChange = async () => {
    try {
      const response = await searchSongs(searchText);
      const data = {
        songs: response.data.results,
        title: "Tìm kiếm: " + searchText,
      };
      setListSongsDetail(data);
      setCurrentView("listSongs");
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div className="flex h-[10vh] flex-row items-center text-white bg-black">
      <div className="flex flex-1 flex-row w-full items-center">
        <img
          className="h-14 cursor-pointer"
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          onClick={() => setCurrentView("main")}
        />
        <IconHome
          stroke={2}
          className="mx-2 bg-[#272727] cursor-pointer size-11 border-none bg p-2 rounded-full"
          onClick={() => setCurrentView("main")}
        />

        <div className="flex flex-1 flex-row bg-[rgb(39,39,39)] px-4 py-2 items-center rounded-full">
          <IconSearch
            stroke={2}
            className="size-7 cursor-pointer"
            onClick={handleSearchChange}
          />
          <input
            type="text"
            className="flex-1 mx-2 bg-[#272727] border-r border-white"
            value={searchText} // Liên kết giá trị input với state
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchChange();
              }
            }}
          />
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
              <span
                className="text-md mx-2 font-bold text-white cursor-pointer hover:underline"
                onClick={toggleProfilePopup}
              >
                {user.first_name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-md mx-2 font-bold text-gray-400 cursor-pointer hover:text-white"
              >
                <IconLogout stroke={2} className="size-6 mr-1" />
                Đăng xuất
              </button>

              {showProfilePopup && (
                <ProfilePopup
                  user={user}
                  onClose={toggleProfilePopup}
                  onUpdate={handleProfileUpdate}
                />
              )}
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
