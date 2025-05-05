import {
  Button,
  Group,
  LoadingOverlay,
  TextInput,
  Title,
  PasswordInput,
  Select,
  Flex,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { openModal } from "@mantine/modals";
import ImageDropzone from "../../Dropzone/Dropzone";
import { createUserService } from "../../../../services/UserService";

const CreateUserForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      userFormData.append("password", formData.password);
      if (formData.image) {
        userFormData.append("image", formData.image.path);
      }

      console.log("Form data:", userFormData);

      await createUserService(userFormData);
      openModal({
        title: "Success",
        children: <p>User created successfully</p>,
        centered: true,
        size: "sm",
        overlayProps: { opacity: 0.55, blur: 3 },
      });
      navigate("/admin/users");
    } catch (error) {
      console.error("Error creating user:", error);
      openModal({
        title: "Error",
        children: <p>Failed to create user</p>,
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

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Title order={1} mt={32}>
        Create User
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
              label="Password"
              size="md"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
              required
            />
            <PasswordInput
              label="Confirm Password"
              size="md"
              placeholder="Repeat password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
              required
            />
            <ImageDropzone
              onUpload={handleImageUpload}
              label="Upload user image (optional)"
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

export default CreateUserForm;
