import { useState, useEffect } from "react";
import { IconX, IconCheck, IconUpload } from "@tabler/icons-react";
import { updateUserService, getUserService } from "../../services/UserService";

const ProfilePopup = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    image: null,
    password: "",
    confirmPassword: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Gender options matching backend expectations (numeric values)
  const genderOptions = [
    { value: "1", label: "Nam" },
    { value: "2", label: "Nữ" },
    { value: "3", label: "Khác" },
  ];

  useEffect(() => {
    // Initialize form data only if user exists
    if (user && typeof user === "object" && user.id) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender ? String(user.gender) : "", // Convert to string for select
        image: null,
        password: "",
        confirmPassword: "",
      });
      setPreviewImage(user.image || null);
    } else {
      setErrors({
        general: "Không có thông tin người dùng để hiển thị",
      });
      setIsLoading(false);
      return;
    }

    // Fetch user details if ID is provided
    setIsLoading(true);
    const fetchUserDetails = async () => {
      try {
        const response = await getUserService(user.id);
        console.log("getUserService Response:", response); // Debug response
        const userData = response.data?.data || response.data; // Handle both structures
        if (!userData) {
          throw new Error("Không tìm thấy thông tin người dùng");
        }
        setFormData((prevData) => ({
          ...prevData,
          username: userData.username || user.username || "",
          email: userData.email || user.email || "",
          phone: userData.phone || user.phone || "",
          gender: userData.gender ? String(userData.gender) : "",
          image: null,
          password: "",
          confirmPassword: "",
        }));
        setPreviewImage(userData.image || user.image || null);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setErrors({
          general: error.message || "Không thể tải thông tin người dùng",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, image: "Vui lòng chọn file ảnh" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: "Ảnh không được lớn hơn 5MB" });
        return;
      }
      setFormData({
        ...formData,
        image: file,
      });
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Tên người dùng không được để trống";
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu không khớp";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrors({});

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email || "");
      formDataToSend.append("phone", formData.phone || "");
      if (formData.gender) {
        formDataToSend.append("gender", formData.gender); // Only send if non-empty
      }
      if (formData.password) {
        formDataToSend.append("password", formData.password);
      }
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      console.log("FormData to send:", Object.fromEntries(formDataToSend));
      const response = await updateUserService(user.id, formDataToSend);
      const updatedUserData = response.data.data || response.data;

      const updatedUser = {
        ...user,
        username: updatedUserData.username || formData.username,
        email: updatedUserData.email || formData.email,
        phone: updatedUserData.phone || formData.phone,
        gender: updatedUserData.gender || formData.gender || null,
        image:
          updatedUserData.image || (formData.image ? previewImage : user.image),
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      if (onUpdate) {
        onUpdate(updatedUser);
      }

      setSuccessMessage("Cập nhật thông tin thành công!");
      setFormData({
        ...formData,
        password: "",
        confirmPassword: "",
        image: null,
      });
      setPreviewImage(updatedUserData.image || previewImage);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error updating user profile:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Có lỗi xảy ra khi cập nhật";
      setErrors({
        general:
          typeof errorMessage === "string"
            ? errorMessage
            : "Vui lòng kiểm tra lại thông tin",
        ...(typeof errorMessage === "object" ? errorMessage : {}),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCloseWithReset = () => {
    setFormData({
      username: "",
      email: "",
      phone: "",
      gender: "",
      image: null,
      password: "",
      confirmPassword: "",
    });
    setPreviewImage(null);
    setErrors({});
    setSuccessMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#282828] rounded-lg max-w-md w-full p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Thông tin cá nhân</h2>
          <button
            onClick={onCloseWithReset}
            className="p-1 hover:bg-[#3e3e3e] rounded-full"
          >
            <IconX size={18} />
          </button>
        </div>

        {successMessage && (
          <div className="bg-green-500 text-white p-3 mb-4 rounded flex items-center">
            <IconCheck size={18} className="mr-2" />
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div className="bg-red-500 text-white p-3 mb-4 rounded">
            {errors.general}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center mb-4">
              <div
                className="w-24 h-24 rounded-full mb-2 overflow-hidden bg-[#3e3e3e] flex items-center justify-center"
                style={{ border: "2px dashed #555" }}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <IconUpload size={24} className="text-gray-400" />
                )}
              </div>
              <label className="bg-[#1db954] hover:bg-[#1ed760] text-white px-3 py-1 rounded-full text-sm cursor-pointer">
                Đổi ảnh đại diện
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">{errors.image}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Tên người dùng</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full p-2 bg-[#3e3e3e] rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 ${
                  errors.username ? "border border-red-500" : ""
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 bg-[#3e3e3e] rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 ${
                  errors.email ? "border border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 bg-[#3e3e3e] rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Giới tính</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 bg-[#3e3e3e] rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="">Chọn giới tính</option>
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="border-t border-gray-600 my-4 pt-4">
              <h3 className="font-medium mb-4">Đổi mật khẩu</h3>

              <div className="mb-3">
                <label className="block text-sm mb-1">Mật khẩu mới</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-2 bg-[#3e3e3e] rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 ${
                    errors.password ? "border border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full p-2 bg-[#3e3e3e] rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 ${
                    errors.confirmPassword ? "border border-red-500" : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onCloseWithReset}
                className="bg-transparent hover:bg-[#3e3e3e] text-white px-4 py-2 rounded-full mr-3"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#1db954] hover:bg-[#1ed760] text-white px-6 py-2 rounded-full flex items-center"
              >
                {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePopup;
