import React, { useState } from "react";
import { IconMusic } from "@tabler/icons-react";
import { updatePlaylistService } from "../../../services/playlistService";

const EditPlaylistForm = ({ playlist, onClose, setCurrentView }) => {
    const [title, setTitle] = useState(playlist.title);
    const [description, setDescription] = useState(playlist.description || ""); // Thêm state cho mô tả
    const [image, setImage] = useState(playlist.image); // Đường dẫn ảnh mặc định

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result); // base64 string
            };

            reader.readAsDataURL(file); // base64 image
        }
    };

    const handleSave = async () => {
        try {
            const data = {
                title: title,
                description: description,
                image: image,
                token: localStorage.getItem("access_token")
            }
            const res = await updatePlaylistService(playlist.id, data);
            setCurrentView(res.data);
            setImage(res.data.image);
            alert("Cập nhật playlist thành công!");
            window.location.reload();
            onClose();
        } catch (error) {
            console.error("Error updating playlist:", error);
            
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#242424] p-6 rounded-lg w-[500px]">
                <h2 className="text-xl font-bold mb-4">Chỉnh sửa Playlist</h2>
                <div className="flex gap-4 mb-4">
                    {/* Ảnh bên trái */}
                    <div className="relative w-[230px] bg-[#333333] rounded flex items-center justify-center overflow-hidden cursor-pointer"
                        onClick={() => document.getElementById("imageInput").click()}>
                        {image ? (
                            <img src={image} alt="Playlist" className="absolute inset-0 w-full h-full object-cover rounded" />
                        ) : (
                            <div className="h-full w-full bg-gradient-to-br from-[#333333] to-[#121212] flex items-center justify-center">
                                <IconMusic stroke={2} className="w-24 h-24 text-gray-400" />
                            </div>
                        )}
                        <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </div>

                    {/* Title và Description bên phải */}
                    <div className="flex-1">
                        <div className="mb-4">
                            <label className="block text-sm mb-2">Tên Playlist</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-[#333333] px-4 py-2 rounded text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-2">Mô tả Playlist</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-[#333333] px-4 py-2 rounded text-white resize-none"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 rounded text-white">
                        Hủy
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-green-500 rounded text-white">
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPlaylistForm;
