import { useState } from "react";

const Song = () => {
    return (
        <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 items-center hover:bg-white/10 rounded-md p-2 group mt-4">
            <div className="text-gray-400">1</div>
            <div className="flex items-center gap-3">
                <img src="path-to-song-image" alt="song" className="w-10 h-10" />
                <div>
                    <p className="text-white">Phía Sau Em</p>
                    <p className="text-sm text-gray-400">Kay Trần, Binz</p>
                </div>
            </div>
            <div className="text-gray-400">Phía Sau Em</div>
            <div className="text-gray-400 text-right">3:09</div>
        </div>
    );
};

const MyLibrary = ({playlist}) => {
    const [available, setAvailable] = useState(false);
    return (
        <div className="bg-[#131313] text-white h-[78vh] flex-1 mr-2 rounded-lg overflow-y-auto">
            <div className="flex flex-col">
                {/* Header */}
                <div className="flex items-end gap-4 p-4 pb-6 bg-gradient-to-b from-[#666666] to-[#595959]">
                    <div className="w-[232px] h-[232px] bg-gradient-to-br from-[#333333] to-[#121212] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-gray-400">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="text-sm">Playlist</p>
                            <h1 className="text-5xl font-bold mt-2">{playlist.title}</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src="/path-to-avatar" alt="User Avatar" className="w-6 h-6 rounded-full" />
                            <span className="text-sm font-semibold">Huỳnh Ngọc Triều</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center mx-6">
                    <div className="flex flex-row items-center">
                        {available && (
                            <div className="mr-4 bg-green-500 rounded-full group-hover:block transition-all duration-300 hover:scale-110 hover:bg-green-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-12 p-3 text-black">
                                    <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                                </svg>
                            </div>
                        )}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-8">
                            <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                        </svg>
                    </div>
                    <div className="flex flex-row items-center py-8">
                        <h3 className="text-md text-gray-300 mr-2">Danh sách</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                            <path
                                fill-rule="evenodd"
                                d="M6 4.75A.75.75 0 0 1 6.75 4h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 4.75ZM6 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 10Zm0 5.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75ZM1.99 4.75a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 15.25a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 10a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1V10Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
                <div className="mx-12 mb-4">
                    <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 text-sm text-gray-400 border-b border-gray-700/50 pb-2">
                        <div>#</div>
                        <div>Tiêu đề</div>
                        <div>Album</div>
                        <div className="flex justify-end">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Example song item */}
                    {
                        Array.from({ length: 3 }).map((_, index) => (
                           <Song/> 
                        ))
                    }
                </div>
                {/* Search Bar */}
                <div className="mx-6 border-t border-t-gray-700/50 pt-5">
                    <h3 className="text-2xl font-bold">Hãy cùng tìm nội dung cho danh sách phát của bạn</h3>
                    <div className="flex flex-row justify-between items-center">
                        <div className="w-full max-w-[364px] relative mt-4">
                            <input type="text" placeholder="Tìm bài hát và tập podcast" className="w-full bg-[#242424] px-10 py-2 rounded-full text-sm placeholder:text-gray-400" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-gray-400 cursor-pointer">
                            <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyLibrary;
