import React, { useCallback, useEffect, useState } from "react";

const BlogPage = () => {
  return (
    <div>
      <div className="mx-[48px] pt-[100px] pl-16">
        <div className="flex gap-7">
          <div>
            <div className="mb-5">
              Bệnh tiêu hóa {">"} Các vấn đề tiêu hóa khác
            </div>
            <div className="text-4xl font-bold text-slate-800 w-[68%] mb-5">
              Mách bạn 4 cách chữa ngộ độc thức ăn bằng gừng tại nhà
            </div>
            <div>
              <img
                className="rounded-lg h-[450px] w-full object-cover "
                src={require("../Images/cach-chua-ngo-doc-thuc-an-bang-gung.jpg")}
                alt=""
              ></img>
            </div>
          </div>

          <div className="bg-white border rounded-xl drop-shadow-lg w-[30%] max-h-[220px] px-2 grid grid-rows-3 justify-items-center">
            <img
              className="rounded-full w-[65px] h-[65px] mt-2 object-contain drop-shadow-sm"
              src={require("../Images/doctor1.jpg")}
              alt=""
            ></img>
            <div className="grid place-items-center py-2">
              <div className="text-slate-700 text-sm">
                Thông tin kiểm chứng bởi:
              </div>
              <div className="text-slate-800 text-lg font-medium">Author</div>
            </div>
            <div className="grid place-items-center py-2 w-full">
              <hr className="w-[90%]"></hr>
              <div className="text-sm text-center">
                <span className="">Tác giả:</span>
                <span className="font-medium"> Hương lan</span>
                <div>Ngày cập nhật: 11/03/2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
