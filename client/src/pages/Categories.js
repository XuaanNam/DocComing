import React from "react";

const Categories = () => {
  const categories = [
    {
      url: require("../Images/categories/Category1.webp"),
      id: 1,
      name: "Tiểu đường",
    },
    {
      url: require("../Images/categories/Category2.webp"),
      id: 2,
      name: "Bệnh tim mạch",
    },
    {
      url: require("../Images/categories/Category3.webp"),
      id: 3,
      name: "Bệnh hô hấp",
    },
    {
      url: require("../Images/categories/Category4.webp"),
      id: 4,
      name: "Ung thư - Ung bướu",
    },
    {
      url: require("../Images/categories/Category5.png"),
      id: 5,
      name: "Bệnh tiêu hóa",
    },
    {
      url: require("../Images/categories/Category6.webp"),
      id: 6,
      name: "Tâm lý - Tâm thần",
    },
    {
      url: require("../Images/categories/Category7.webp"),
      id: 7,
      name: "Da liễu",
    },
    {
      url: require("../Images/categories/Category8.webp"),
      id: 8,
      name: "Sức khỏe tình dục",
    },
    {
      url: require("../Images/categories/Category9.webp"),
      id: 9,
      name: "Dị ứng",
    },
    {
      url: require("../Images/categories/Category10.webp"),
      id: 10,
      name: "Bệnh xương khớp",
    },
    {
      url: require("../Images/categories/Category11.webp"),
      id: 11,
      name: "Bệnh về máu",
    },
    {
      url: require("../Images/categories/Category12.webp"),
      id: 12,
      name: "Bệnh truyền nhiễm",
    },
    {
      url: require("../Images/categories/Category13.png"),
      id: 13,
      name: "Sức khỏe mắt",
    },
    {
      url: require("../Images/categories/Category14.webp"),
      id: 14,
      name: "Bệnh về não",
    },
    {
      url: require("../Images/categories/Category15.webp"),
      id: 15,
      name: "Ăn uống lành mạnh",
    },
    {
      url: require("../Images/categories/Category16.webp"),
      id: 16,
      name: "Bệnh thận và đường tiết niệu",
    },
    {
      url: require("../Images/categories/Category17.webp"),
      id: 17,
      name: "Thể dục thể thao",
    },
    {
      url: require("../Images/categories/Category18.webp"),
      id: 18,
      name: "Dược liệu",
    },
    {
      url: require("../Images/categories/Category19.webp"),
      id: 19,
      name: "Mang thai",
    },
    {
      url: require("../Images/categories/Category20.webp"),
      id: 20,
      name: "nuôi dạy con",
    },
    {
      url: require("../Images/categories/Category21.webp"),
      id: 21,
      name: "bệnh tai mũi họng",
    },
    {
      url: require("../Images/categories/Category22.webp"),
      id: 22,
      name: "Sức khỏe phụ nữ",
    },
    {
      url: require("../Images/categories/Category23.png"),
      id: 23,
      name: "Sức khỏe",
    },
    {
      url: require("../Images/categories/Category24.webp"),
      id: 24,
      name: "Chăm sóc giấc ngủ",
    },
    {
      url: require("../Images/categories/Category25.webp"),
      id: 25,
      name: "Thói quen lành mạnh",
    },
    {
      url: require("../Images/categories/Category26.webp"),
      id: 26,
      name: "Sức khỏe nam giới",
    },
    {
      url: require("../Images/categories/Category27.webp"),
      id: 27,
      name: "Sức khỏe răng miệng",
    },
    {
      url: require("../Images/categories/Category28.webp"),
      id: 28,
      name: "Lão hóa lành mạnh",
    },
  ];
  return (
    <div className="pt-[70px]">
      <div className="mx-24 p-5">
        <p className="text-slate-700 font-medium text-2xl mb-7 text-center">
          Tất cả chuyên mục
        </p>
        <div className="flex flex-wrap gap-7">
          {categories.map((item) => (
            <div
              key={item.id}
              className="w-36 h-36 p-3 cursor-pointer rounded-3xl bg-lime-50 shadow-xl flex flex-col items-center justify-center transition-transform duration-500 hover:scale-110"
            >
              <img className="h-20 w-20" alt="" src={item.url}></img>
              <p className="font-medium text-gray-500 h-14 flex items-center text-center">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
