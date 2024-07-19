import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <main className="grid max-sm:max-h-[60vh] min-h-screen place-items-center bg-[#416475] px-6 py-24 sm:py-32 lg:px-8">
        <h1 className="font-bold max-sm:text-3xl text-4xl text-[#92a4ad]">Không tìm thấy trang !</h1>
        <p className="zoom-area font-medium max-sm:text-2xl text-2xl text-[#92a4ad] w-full">Xin lỗi, chúng tôi không thể tìm thấy trang mà bạn tìm kiếm. </p>
        <section className="error-container">
          <span>4</span>
          <span><span className="screen-reader-text">0</span></span>
          <span>4</span>
        </section>
        <div className="link-container">
          <Link to="/" className="more-link max-sm:text-xl">Trở về trang chủ</Link>
        </div>
      </main>
    </>
  )
}