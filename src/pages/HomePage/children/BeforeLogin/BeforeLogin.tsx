export default function BeforeLogin() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[500px] h-[351px] mr-[64px]">
        <p className="font-inter font-semibold text-[24px] leading-[28.8px] text-[#EC221F]">
          Welcome!
        </p>
        <p className="font-inter font-bold text-[20px] leading-[24px] text-[#1E1E1E] mt-[12px] mb-[16px]">
          Student Smart Printing Service (HCMUT_SSPS)
        </p>
        <p className="font-inter font-normal text-[16px] leading-[22.4px] text-[#1E1E1E] mb-[12px]">
          We are a smart printing service system
        </p>
        <p className="font-inter font-normal text-[16px] leading-[22.4px] text-[#1E1E1E]">
          In the pursuit of knowledge, this service will provide students,
          teachers their critical needs of printing paper ^^
        </p>
      </div>
      <img src="public/mayin.jpg" className="w-[480px] h-[472px]" />
    </div>
  );
}
