import React from "react";

const BookingSuccess = () => {
  return (
    <div className="">
      <script type="text/javascript">
        function disableBack() {window.history.forward()}
        setTimeout("disableBack()", 0); window.onunload = function () {null};
      </script>
      <div className="h-screen flex flex-col gap-3 items-center justify-center">
        <img
          className="h-56 w-60"
          src={require("../../Images/BookingSuccess.png")}
          alt=""
        ></img>
        <p className="font-bold text-2xl text-teal-600">
          Cảm ơn bạn đã đặt lịch hẹn qua Doctor Coming
        </p>
        <a href="/" className="underline font-medium text-lg text-teal-800">
          Trở lại trang chủ
        </a>
      </div>
    </div>
  );
};

export default BookingSuccess;
