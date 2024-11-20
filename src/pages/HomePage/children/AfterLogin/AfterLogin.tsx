import afterLoginImg from "./images/after_login_img.jpg"
import logoProfile from "./images/logo_profile.png"

export default function AfterLogin() {
    return (
        <>
            <div className="relative">
                <img className="w-full" src={ afterLoginImg }/>
                <div className="absolute top-12 left-24 bg-[#6E6C6C] bg-opacity-70 w-1/2">
                    <p className="text-white text-[36px] font-semibold font-inter pt-6 pl-12 leading-[43.57px]">
                        User Announcement <br />
                        (Important Reminder)
                    </p>
                    <button className="bg-[#9CCAF5] text-[32px] font-bold font-inter leading-[38.73px] ml-12 mt-12 mb-12 pt-5 pb-5 pl-10 pr-10">View</button>
                </div>
            </div>
            <div>
                <p className="font-inter font-extrabold text-[44px] leading-[53.25px] text-[#002D57] mt-[16px] ml-[16px] mb-[16px]">
                    User Announcement
                </p>
                <div className="relative flex justify-end">
                    <button className="bg-[#C18BDB] rounded-[40px] font-inter font-extrabold text-[30px] leading-[36.31px] text-[#D9D9D9] px-[32px] py-[12px] mr-5">
                        Add notification (SPSO)
                    </button>
                </div>
                <div className="relative bg-[#D9D9D9] rounded-[47px] mt-12 mr-10 ml-24">
                    <img src={logoProfile} className="absolute w-[100px] top-16 left-12"/>
                    <div className="pl-80 pt-16 pb-20">
                        <p className="font-inter font-bold text-[36px] leading-[43.57px] text-[#0F4578]">Notice about the 003-CS2 Printer Malfunction</p>
                        <p className="font-inter font-extrabold text-[27px] leading-[32.68px] text-[#000000] mt-[20px] mb-[12px]">SPSO No.212 - Monday,30/09/2024</p>
                        <p className="font-inter font-semibold text-[22px] leading-[26.63px] text-[#6E6C6C]">From september 30, 2024,H6-CS2 Printer Stopped All Operations due to Budget Limitations. <br/>
                        Students please use the printers in the neighboring buildings.</p>
                    </div>
                </div>
                <div className="relative bg-[#D9D9D9] rounded-[47px] mt-12 mr-10 ml-24">
                    <img src={logoProfile} className="absolute w-[100px] top-16 left-12"/>
                    <div className="pl-80 pt-16 pb-20">
                        <p className="font-inter font-bold text-[36px] leading-[43.57px] text-[#0F4578]">Notice about the 001-CS1 Printer Malfunction</p>
                        <p className="font-inter font-extrabold text-[27px] leading-[32.68px] text-[#000000] mt-[20px] mb-[12px]">SPSO No.211 - Monday,27/09/2024</p>
                        <p className="font-inter font-semibold text-[22px] leading-[26.63px] text-[#6E6C6C]">From september 27, 2024,H6-CS2 Printer Stopped All Operations due to Budget Limitations.<br/>
                        Students please use the printers in the neighboring buildings.</p>
                    </div>
                </div>
            </div>
        </>
    )
}