import { useState, useEffect } from "react";
import { IconX, IconCheck, IconUpload } from "@tabler/icons-react";
import { updateUserService, getUserService } from "../../services/UserService";

const ProfilePopup = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: null,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Gender options matching the format in UpdateUserForm
  const genderOptions = [
    { value: "1", label: "Nam" },
    { value: "2", label: "Nữ" },
    { value: "3", label: "Khác" },
  ];

  useEffect(() => {
    // Initialize form data from user prop immediately to show something
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        gender: user.gender ? String(user.gender) : "",
        image: null,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setPreviewImage(user.image || null);
    }

    // If we have a user ID, fetch full user data
    if (user && user.id) {
      setIsLoading(true);
      const fetchUserDetails = async () => {
        try {
          const response = await getUserService(user.id);
          const userData = response.data.data;

          // Update form with fetched data
          setFormData((prevData) => ({
            ...prevData,
            username: userData.username || user.username || "",
            email: userData.email || user.email || "",
            phone: userData.phone || user.phone || "",
            firstName: userData.first_name || user.first_name || "",
            lastName: userData.last_name || user.last_name || "",
            gender: userData.gender ? String(userData.gender) : "",
            // Keep password fields empty
            image: userData.image || user.image || null,
          }));
        } catch (error) {
          console.error("Error fetching user details:", error);
          setErrors({
            ...errors,
            general: "Không thể tải thông tin người dùng",
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserDetails();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when field is changed
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
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        setPreviewImage(imageUrl);
        setFormData({
          ...formData,
          image: imageUrl, // Store the image URL string instead of the file object
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Tên không được để trống";
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = "Cần nhập mật khẩu hiện tại";
      }

      if (formData.newPassword.length < 6) {
        newErrors.newPassword = "Mật khẩu phải có ít nhất 6 ký tự";
      }

      if (formData.newPassword !== formData.confirmPassword) {
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
      formDataToSend.append("gender", formData.gender || "");

      // Only include password fields if the user is updating their password
      if (formData.newPassword) {
        formDataToSend.append("password", formData.newPassword);
      }

      // Send image as URL string instead of file object
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      await updateUserService(user.id, formDataToSend);

      // Update local storage user data
      const updatedUser = {
        ...user,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        gender: formData.gender,
        phone: formData.phone,
      };

      // Update the image in localStorage with the image string URL
      if (formData.image) {
        updatedUser.image = formData.image;
      }

      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Notify parent component of the update
      if (onUpdate) {
        onUpdate(updatedUser);
      }

      // Reset password fields
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        image: null,
      });

      // Close popup after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error updating user profile:", error);
      if (error.response?.data?.detail) {
        // Handle API error messages
        if (
          typeof error.response.data.detail === "string" &&
          error.response.data.detail.includes("password")
        ) {
          setErrors({
            ...errors,
            currentPassword: "Mật khẩu hiện tại không chính xác",
          });
        } else if (typeof error.response.data.detail === "object") {
          // Handle object-style error response
          const apiErrors = {};
          Object.keys(error.response.data.detail).forEach((key) => {
            const errorMsg = Array.isArray(error.response.data.detail[key])
              ? error.response.data.detail[key][0]
              : error.response.data.detail[key];
            apiErrors[key] = errorMsg;
          });
          setErrors({
            ...errors,
            ...apiErrors,
            general: "Vui lòng kiểm tra lại thông tin",
          });
        } else {
          setErrors({
            ...errors,
            general: error.response.data.detail || "Có lỗi xảy ra khi cập nhật",
          });
        }
      } else {
        setErrors({
          ...errors,
          general: "Có lỗi xảy ra khi cập nhật thông tin",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#282828] rounded-lg max-w-md w-full p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Thông tin cá nhân</h2>
          <button
            onClick={onClose}
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
            {/* Avatar Upload */}
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
            </div>

            <div>
              <label className="block text-sm mb-1">Tên</label>
              <input
                type="text"
                name="firstName"
                disabled={true}
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full p-2 bg-[#3e3e3e] rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 ${
                  errors.firstName ? "border border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
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
                <label className="block text-sm mb-1">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className={`w-full p-2 bg-[#3e3e3e] rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 ${
                    errors.currentPassword ? "border border-red-500" : ""
                  }`}
                />
                {errors.currentPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label className="block text-sm mb-1">Mật khẩu mới</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`w-full p-2 bg-[#3e3e3e] rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 ${
                    errors.newPassword ? "border border-red-500" : ""
                  }`}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.newPassword}
                  </p>
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
                onClick={onClose}
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
