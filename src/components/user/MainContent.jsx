import { IconPlayerPlayFilled } from '@tabler/icons-react';
const Song = (name, singer, lyric) => {
    return (
        <div className="group flex-shrink-0 hover:bg-gradient-to-b from-[#131313] to-[#272727] text-white cursor-pointer w-[160px] p-3 rounded-md">
            <div className="relative">
                <img
                    className="h-[180px] w-[180px] rounded-lg object-cover object-center"
                    src="https://kenh14cdn.com/203336854389633024/2025/3/23/phao-sunghiepchuongonline-video-cuttercom5-ezgifcom-video-to-gif-converter-1742743391566-17427433926181286024766.gif"
                    alt=""
                />
                <div className="absolute bottom-2 right-2 bg-green-500 rounded-full hidden group-hover:block transition-all duration-300 hover:scale-110 hover:bg-green-400">
                    <IconPlayerPlayFilled className="size-12 p-3 text-black"/>
                </div>
            </div>
            <div className="mt-2 w-full">
                <h3 className="text-base font-medium truncate">Người yêu cũ anh peter</h3>
                <span className="text-sm text-gray-400">Pháo</span>
            </div>
        </div>
    );
};
const Articsle = () => {
    return (
        <div className="group flex-shrink-0 text-white hover:bg-gradient-to-b from-[#131313] to-[#272727] cursor-pointer w-[180px] p-3 rounded-md">
            <div className="relative">
                <img
                    className="h-[160px] w-[180px] rounded-full object-cover object-center"
                    src="https://kenh14cdn.com/203336854389633024/2025/3/23/phao-sunghiepchuongonline-video-cuttercom5-ezgifcom-video-to-gif-converter-1742743391566-17427433926181286024766.gif"
                    alt=""
                />
            </div>
            <div className="mt-2 w-full">
                <h3 className="text-base font-medium truncate">Người yêu cũ anh peter</h3>
                <span className="text-sm text-gray-400">Pháo</span>
            </div>
        </div>
    );
};

const MainContent = () => {
    return (
        <div className="bg-[#131313] text-white h-[78vh] p-4 mr-2 rounded-lg flex-1 overflow-y-auto space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-2xl font-bold mb-6 cursor-pointer hover:underline">Những bài hát thịnh hành {index}</h2>
                        <span className="text-sm font-bold text-gray-400 cursor-pointer hover:underline">Hiện tất cả</span>
                    </div>
                    {
                        index === 1 ? (
                            <div className="flex flex-row gap-4 overflow-x-auto pb-4  scrollbar-none">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <Articsle key={index} />
                                ))}
                            </div>
                            ) : (
                            <div className="flex flex-row gap-4 overflow-x-auto pb-4 scrollbar-none">
                                {Array.from({ length: 20 }).map((_, index) => (
                                    <Song key={index} />
                                ))}
                            </div>
                            )
                    }
                </div>
            ))}
        </div>
    );
};
export default MainContent;
