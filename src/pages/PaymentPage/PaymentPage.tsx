import { useState } from "react";
import AddPage from "./AddPage/AddPage";

export default function PaymentPage() {
  const [pages, setPages] = useState<{ page: number; size: string }[]>([]);

  const calculateTotalPrice = (): number => {
    // Define a baseline price for A4
    const basePrice = 100;

    // Map sizes to a multiplier with respect to A4
    const sizeMultiplier: { [key: string]: number } = {
      A5: 0.5,
      A4: 1,
      A3: 2,
      A2: 4,
      A1: 8,
      A0: 16,
    };

    // Calculate total price
    const totalPrice = pages.reduce((total, page) => {
      console.log(page);
      const multiplier = sizeMultiplier[page.size]; // Default to A4 if size is not defined
      return total + page.page * basePrice * multiplier; // Ensure page.page reflects the count of pages
    }, 0);

    return totalPrice;
  };
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const paymentMethods = [
    { id: "cards", name: "Cards" },
    { id: "momo", name: "Momo" },
    { id: "bkpay", name: "BKPay" },
  ];

  const handleSelect = (method: string) => {
    setSelectedMethod(method);
  };

  return (
    <div className="flex flex-col py-[4.8rem] bg-white justify-between min-h-[80vh]">
      <div className="flex justify-start p-[3rem] h-inherit">
        <div className="min-h-[50vh] font-[700] text-[2.4rem] border-r-2 border-black w-[50%]">
          <p>In ấn</p>
          <p>Mua giấy in</p>
          <AddPage setPages={setPages} />
        </div>
        <div className="flex flex-col min-h-[50vh] font-[700] text-[2.4rem] pl-[3rem] w-[50%] gap-[3rem]">
          <p>Thông tin giao dịch</p>
          <div className="flex flex-row justify-start gap-[20rem]">
            <p>Tổng cộng: </p>
            <p>{calculateTotalPrice()} Đ</p>
          </div>
          <div className="flex flex-row justify-start gap-[3rem] text-[2.4rem] items-center ">
            <p>Phương thức thanh toán</p>
            <select
              value={selectedMethod}
              onChange={(e) => handleSelect(e.target.value)}
              className=" p-4 bg-[#4B4DD6] border-black border-[0.2rem] text-white rounded text-[1.6rem]"
            >
              {paymentMethods.map((method) => (
                <option
                  key={method.id}
                  value={method.id}
                  className="border-black border-[0.2rem]"
                >
                  {method.name}
                </option>
              ))}
            </select>
          </div>
          <button className="w-[20rem] text-[2.4rem] font-bold text-white bg-[#4B4DD6] p-2  hover:bg-blue-100 hover:text-blue-300 rounded-md">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
