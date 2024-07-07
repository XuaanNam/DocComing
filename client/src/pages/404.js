export default function PageNotFound() {
  return (
    <>
      <main className="grid min-h-screen place-items-center bg-[#416475] px-6 py-24 sm:py-32 lg:px-8">
        {/* <div className="text-center">
          <p className="text-2xl font-medium text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Không tìm thấy trang</h1>
          <p className="mt-6 text-lg leading-7 text-gray-600">Xin lỗi, chúng tôi không thể tìm thấy trang mà bạn tìm kiếm.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Trở về trang chủ
            </a>
          </div>
        </div> */}

        <h1 className="font-bold text-4xl text-[#92a4ad]">Không tìm thấy trang !</h1>
        <p className="zoom-area font-medium text-2xl text-[#92a4ad] w-full">Xin lỗi, chúng tôi không thể tìm thấy trang mà bạn tìm kiếm. </p>
        <section className="error-container">
          <span>4</span>
          <span><span className="screen-reader-text">0</span></span>
          <span>4</span>
        </section>
        <div className="link-container">
          <a href="/" className="more-link">Trở về trang chủ</a>
        </div>
      </main>
    </>
  )
}