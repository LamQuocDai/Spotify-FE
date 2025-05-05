import {
  Button,
  Group,
  LoadingOverlay,
  TextInput,
  Title,
  PasswordInput,
  Select,
  Flex,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { openModal } from "@mantine/modals";
import ImageDropzone from "../../Dropzone/Dropzone";
import {
  getUserService,
  updateUserService,
} from "../../../../services/UserService";

const UpdateUserForm = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const genderOptions = [
    { value: "1", label: "Male" },
    { value: "2", label: "Female" },
    { value: "3", label: "Other" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setFetchError("No user ID provided");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await getUserService(userId);
        console.log("API Response:", response); // Debug log
        const userData =
          response.data.data || response.data.user || response.data;
        console.log("User Data:", userData); // Debug log

        if (userData) {
          setFormData({
            username: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            gender: userData.gender ? String(userData.gender) : "",
            password: "",
            confirmPassword: "",
            image: userData.image || null,
          });
        } else {
          throw new Error("No user data found in response");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setFetchError("Failed to fetch user data");
        openModal({
          title: "Error",
          children: <Text>Failed to fetch user data</Text>,
          centered: true,
          size: "sm",
          overlayProps: { opacity: 0.55, blur: 3 },
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const userFormData = new FormData();
      userFormData.append("username", formData.username);
      userFormData.append("email", formData.email);
      userFormData.append("phone", formData.phone);
      userFormData.append("gender", formData.gender);
      if (formData.password) {
        userFormData.append("password", formData.password);
      }
      if (formData.image) {
        userFormData.append("image", formData.image);
      }

      await updateUserService(userId, userFormData);
      openModal({
        title: "Success",
        children: <Text>User updated successfully</Text>,
        centered: true,
        size: "sm",
        overlayProps: { opacity: 0.55, blur: 3 },
      });
      navigate("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
      openModal({
        title: "Error",
        children: <Text>Failed to update user</Text>,
        centered: true,
        size: "sm",
        overlayProps: { opacity: 0.55, blur: 3 },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (file) => {
    setFormData({ ...formData, image: file });
  };

  if (fetchError) {
    return (
      <>
        <Title order={1} mt={32}>
          Update User
        </Title>
        <div className="bg-white p-8 rounded-lg mt-7">
          <Text color="red">{fetchError}</Text>
          <Group mt={32} justify="flex-end">
            <Link to="/admin/users">
              <Button variant="filled" color="gray">
                Back to Users
              </Button>
            </Link>
          </Group>
        </div>
      </>
    );
  }

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Title order={1} mt={32}>
        Update User
      </Title>

      <div className="bg-white p-8 rounded-lg mt-7">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={20}>
            <TextInput
              label="Username"
              size="md"
              placeholder="Enter username"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              error={errors.username}
              required
            />
            <TextInput
              label="Email"
              size="md"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
              required
            />
            <TextInput
              label="Phone"
              size="md"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              error={errors.phone}
            />
            <Select
              label="Gender"
              size="md"
              placeholder="Select gender"
              data={genderOptions}
              value={formData.gender}
              onChange={(value) => handleChange("gender", value)}
              error={errors.gender}
              required
            />
            <PasswordInput
              label="New Password (leave blank to keep current)"
              size="md"
              placeholder="Enter new password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
            />
            <PasswordInput
              label="Confirm New Password"
              size="md"
              placeholder="Repeat new password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
              disabled={!formData.password}
            />
            <ImageDropzone
              onUpload={handleImageUpload}
              label="Update user image (optional)"
            />
          </Flex>

          <Group mt={32} justify="flex-end">
            <Link to="/admin/users">
              <Button variant="filled" color="gray">
                Cancel
              </Button>
            </Link>
            <Button type="submit" variant="filled" color="#1db954">
              Save
            </Button>
          </Group>
        </form>
      </div>
    </>
  );
};

export default UpdateUserForm;
