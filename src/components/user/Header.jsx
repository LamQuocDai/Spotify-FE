const Header = () => {
    return (
        <div className="flex h-[10vh] flex-row w-full items-center bg-black">
            <div className="flex flex-1 flex-row w-full items-center">
                <img className="h-14" src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="mx-2 bg-[#272727] cursor-pointer size-11 border-none bg p-2 rounded-full">
                    <path
                        fill-rule="evenodd"
                        d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                        clip-rule="evenodd"
                    />
                </svg>

                <div className="flex flex-1 flex-row bg-[#272727] px-4 py-2 items-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input type="text" className="flex-1 mx-2 bg-[#272727]  border-r border-white" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                    </svg>
                </div>
            </div>
            <div className="flex flex-row flex-1 items-center">
                <div className="flex flex-row items-center px-4 border-r border-white">
                    <span className="text-md mx-2 font-bold text-gray-400 cursor-pointer">Premium</span>
                    <span className="text-md mx-2 font-bold text-gray-400 cursor-pointer">Hổ trợ</span>
                    <span className="text-md mx-2 font-bold text-gray-400 cursor-pointer">Tải xuống</span>
                </div>
                <div className="flex flex-row mx-4 items-center">
                    <div className="flex flex-row items-center  mx-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 mx-1">
                            <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                        </svg>
                        <span className="text-md mx-2 font-bold text-gray-400 cursor-pointer">Cài đặt ứng dụng</span>
                    </div>
                    <span className="text-md mx-2 font-bold text-gray-400  cursor-pointer">Đăng kí</span>
                    <span className="py-3 px-4 ml-2 rounded-full bg-white text-black  cursor-pointer">Đăng nhập</span>
                </div>
            </div>
        </div>
    );
};
export default Header;
