import { IconHome, IconSearch, IconArticle  } from '@tabler/icons-react';
const Header = () => {
    const reloadPage = () => {
        window.location.reload();
    }
    return (
        <div className="flex h-[10vh] flex-row items-center text-white bg-black">
            <div className="flex flex-1 flex-row w-full items-center">
                <img className="h-14 cursor-pointer" src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" onClick={()=>reloadPage()}/>
                <IconHome stroke={2} className="mx-2 bg-[#272727] cursor-pointer size-11 border-none bg p-2 rounded-full" onClick={()=>reloadPage()}/>

                <div className="flex flex-1 flex-row bg-[#272727] px-4 py-2 items-center rounded-full">
                    <IconSearch stroke={2} className="size-7 "/>
                    <input type="text" className="flex-1 mx-2 bg-[#272727]  border-r border-white" />
                    <IconArticle stroke={2} className="size-6 cursor-pointer"/>
                </div>
            </div>
            <div className="flex flex-row flex-1 items-center justify-end">
                <div className="flex flex-row mx-4 items-center">
                    <span className="text-md mx-2 font-bold text-gray-400  cursor-pointer">Đăng kí</span>
                    <span className="py-3 px-4 ml-2 rounded-full bg-white text-black  cursor-pointer">Đăng nhập</span>
                </div>
            </div>
        </div>
    );
};
export default Header;
