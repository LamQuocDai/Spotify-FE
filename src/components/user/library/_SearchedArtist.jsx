import React, { useEffect, useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";

const SearchedArtist = ({ artist }) => {
    return (
        <div className="flex flex-row items-center mx-6 mt-6">
            <img src="https://i.scdn.co/image/ab67616100005174e6f407c7f3a0ec98845e4431" alt="Den" className="w-12 h-12 rounded-full" />
            <div className="flex flex-col ml-3">
                <span className="text-white font-bold">Đen</span>
                <span className="text-sm text-gray-400">Nghệ sĩ</span>
            </div>
            <IconChevronRight stroke={2} className="ml-auto size-10 text-gray-500 cursor-pointer" />
        </div>
    );
};
export default SearchedArtist;