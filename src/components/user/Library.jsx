const Library = () => {
    return (
        <div className="flex w-[420px] flex-col bg-[#131313] px-2 mx-2 rounded-lg">
            <div className="flex flex-row justify-between items-center pt-4 pb-12 px-2">
                <span className="text-md font-bold">Thư viện</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6">
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                </svg>
            </div>
            <div className="h-[calc(100vh-410px)] overflow-y-auto space-y-4 pr-1 hover:scrollbar-thin hover:scrollbar-thumb-gray-600 hover:scrollbar-track-transparent scrollbar-none">
                <div className="bg-[#272727] h-36 w-full p-5 rounded-lg">
                    <h3 className="font-bold">Tạo danh sách phát đầu tiên của bạn</h3>
                    <h3 className="text-sm font-semibold">Rất dễ! chúng tôi sẽ giúp bạn</h3>
                    <button className="mt-4 text-sm font-bold bg-white text-black rounded-full py-1.5 px-4">Tạo danh sách phát</button>
                </div>
                <div className="bg-[#272727] h-36 w-full p-5 rounded-lg">
                    <h3 className="font-bold">Hãy cùng tìm và theo dõi một số podcast</h3>
                    <h3 className="text-sm font-semibold">Chúng tôi sẽ cập nhật cho bạn thông tin về các tập mới</h3>
                    <button className="mt-4 text-sm font-bold bg-white text-black rounded-full py-1.5 px-4">Duyệt xem podcast</button>
                </div>
            </div>
            <div className="flex flex-col p-4">
                <div className="flex flex-wrap">
                    <span className="text-xs mb-2 mr-7 font-semibold cursor-pointer text-gray-400">Pháp lý</span>
                    <span className="text-xs mb-2 mr-7 font-semibold cursor-pointer text-gray-400">Trung tâm an toàn và quyền riêng tư</span>
                    <span className="text-xs mb-2 mr-7 font-semibold cursor-pointer text-gray-400">Chính sách quyền riêng tư</span>
                    <span className="text-xs mb-2 mr-7 font-semibold cursor-pointer text-gray-400">Cookie</span>
                    <span className="text-xs mb-2 mr-7 font-semibold cursor-pointer text-gray-400">Giới thiệu</span>
                    <span className="text-xs mb-2 mr-7 font-semibold cursor-pointer text-gray-400">Quảng cáo</span>
                    <span className="text-xs mb-2 mr-7 font-semibold cursor-pointer text-gray-400">Hổ trợ tiếp cận</span>
                </div>
                <span className="text-sm font-bold w-fit cursor-pointer">Cookie</span>
                <div className="flex items-center my-6 border py-2 px-4 cursor-pointer w-fit rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 mr-2">
                        <path
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-6.5 6.326a6.52 6.52 0 0 1-1.5.174 6.487 6.487 0 0 1-5.011-2.36l.49-.98a.423.423 0 0 1 .614-.164l.294.196a.992.992 0 0 0 1.491-1.139l-.197-.593a.252.252 0 0 1 .126-.304l1.973-.987a.938.938 0 0 0 .361-1.359.375.375 0 0 1 .239-.576l.125-.025A2.421 2.421 0 0 0 12.327 6.6l.05-.149a1 1 0 0 0-.242-1.023l-1.489-1.489a.5.5 0 0 1-.146-.353v-.067a6.5 6.5 0 0 1 5.392 9.23 1.398 1.398 0 0 0-.68-.244l-.566-.566a1.5 1.5 0 0 0-1.06-.439h-.172a1.5 1.5 0 0 0-1.06.44l-.593.592a.501.501 0 0 1-.13.093l-1.578.79a1 1 0 0 0-.553.894v.191a1 1 0 0 0 1 1h.5a.5.5 0 0 1 .5.5v.326Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <span>Tiếng Việt</span>
                </div>
            </div>
        </div>
    );
};
export default Library;
