import React from "react";
import { FaYoutube } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Logo from "../logo";
import LicenseLogo from "../license";
const Footer = () => {
  return (
    <footer className="bg-black text-white pt-14 pb-3">
      <div className="w-full px-5 md:px-10 mx-auto flex justify-between flex-col md:flex-row gap-[50px] md:gap-0 ">
        {/* LEFT START */}
        <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col xl:flex-row">
          {/* MENU START */}
          <div className="flex flex-col gap-3 shrink-0">
            <div className="font-oswald font-medium  text-sm cursor-pointer">
              Hotline
            </div>
            <div className="flex text-sm text-white/[0.5]  cursor-pointer items-center">
              <BsFillTelephoneFill className="mr-2" />
              Thứ 2 - Thứ 6 (8:30 - 18:30)
            </div>
            <div className="font-oswald font-medium  text-sm cursor-pointer">
              Email
            </div>
            <div className="flex text-sm text-white/[0.5]  cursor-pointer items-center">
              <MdEmail className="mr-2" />
              support@ticketnow.vn
            </div>
            <div className="font-oswald font-medium  text-sm cursor-pointer">
              Văn phòng
            </div>
            <div className="flex text-sm text-white/[0.5]  cursor-pointer items-center">
              <FaLocationPin className="mr-2" />
              UIT, Phường Linh Trung, Thành phố Thủ Đúc, TP. Hồ Chí Minh
            </div>
          </div>
          {/* MENU END */}

          {/* NORMAL MENU START */}
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium  text-sm">
                Dành cho Ban Tổ chức
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Hợp tác với chúng tôi
              </div>
              <div className="font-oswald font-medium  text-sm">
                Về công ty chúng tôi
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Thông tin về TicketNow
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Điều khoản sử dụng
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Quy chế hoạt động sàn TMĐT
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Cơ chế giải quyết tranh chấp/ khiếu nại
              </div>
            </div>
            {/* MENU END */}

            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium  text-sm">
                Dành cho Khách hàng
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Hướng dẫn mua vé
              </div>
              <div className="font-oswald font-medium  text-sm">
                Trung tâm hỗ trợ
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Câu hỏi thường gặp
              </div>
            </div>
            {/* MENU END */}
          </div>
          {/* NORMAL MENU END */}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-4 justify-center md:justify-start">
          <div className="flex flex-col">
            <div className="font-oswald font-medium  text-sm text-right mb-2">
              Theo dõi chúng tôi
            </div>
            <div className="flex flex-row gap-3">
              <FaFacebook size={20} />
              <FaInstagram size={20} />
              <BsTwitterX size={20} />
              <FaYoutube size={20} />
            </div>
          </div>
        </div>
        {/* RIGHT END */}
      </div>
      <div className="w-full px-5 md:px-10 mx-auto flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0">
        {/* LEFT START */}
        <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
          <div className="flex text-[12px] text-white/[0.5] hover:text-white cursor-pointer  text-left ">
            <Logo />
            Hệ thống quản lý và phân phối vé sự kiện hàng đầu Việt Nam
            TicketNowCo. Ltd. © 2023
          </div>
          <div className="flex flex-col">
            <div className="text-[12px] text-white/[0.5] ">
              Công ty TNHH TicketNow
            </div>
            <div className="text-[12px] text-white/[0.5] ">
              Đại diện theo pháp luật: Đoàn Lê Tuấn Thành
            </div>
            <div className="text-[12px] text-white/[0.5] ">
              Địa chỉ: UIT, Phường Linh Trung, Thành phố Thủ Đúc, TP. Hồ Chí
              Minh
            </div>
            <div className="text-[12px] text-white/[0.5] ">
              Hotline: 1900.0000 - Email: support@ticketnow.vn
            </div>
            <div className="text-[12px] text-white/[0.5] ">
              Giấy chứng nhận đăng ký doanh nghiệp số: 0123456789, cấp lần đầu
              ngày 12/12/2023 bởi Sở Kế Hoạch và Đầu Tư TP. Hồ Chí Minh
            </div>
          </div>
        </div>
        {/* LEFT END */}
        {/* RIGHT START */}
        <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
          <LicenseLogo />
        </div>
        {/* RIGHT END */}
      </div>
    </footer>
  );
};

export default Footer;
