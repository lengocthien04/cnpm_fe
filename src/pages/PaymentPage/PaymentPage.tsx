import { useState, useContext, Fragment } from "react";
import AddPage from "./AddPage/AddPage";
import { AppContext } from "../../contexts/app.context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "../../api/user.api";
import DialogPopup from "../../components/DialogPopup";
import LoadingSection from "../../components/loading/LoadingSection";

export default function PaymentPage() {
  const [pages, setPages] = useState<{ page: number; size: string }[]>([]);
  const { profile } = useContext(AppContext); // Getting profile info for user ID
  const queryClient = useQueryClient();

  const calculateTotalPages = (): number => {
    return pages.reduce((total, page) => total + page.page, 0);
  };

  const calculateTotalPrice = (): number => {
    const basePrice = 100;
    const sizeMultiplier: { [key: string]: number } = {
      A5: 0.5,
      A4: 1,
      A3: 2,
      A2: 4,
      A1: 8,
      A0: 16,
    };

    return pages.reduce((total, page) => {
      const multiplier = sizeMultiplier[page.size] || 1;
      return total + page.page * basePrice * multiplier;
    }, 0);
  };

  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false); // Dialog visibility
  const [excuting, setExcuting] = useState<boolean>(false); // Loading state
  const [success, setSuccess] = useState<boolean>(false); // Success state
  const [error, setError] = useState<boolean>(false); // Error state

  const paymentMethods = [
    { id: "cards", name: "Cards" },
    { id: "momo", name: "Momo" },
    { id: "bkpay", name: "BKPay" },
  ];

  const handleSelect = (method: string) => {
    setSelectedMethod(method);
  };

  // Mutation to add pages
  const addPagesMutation = useMutation({
    mutationFn: userApi.addPages,
    onMutate: () => {
      setExcutingDialog(true); // Show the dialog when mutation starts
      setExcuting(true); // Set loading state to true
    },
    onSuccess: () => {
      setExcuting(false); // Hide loading
      setSuccess(true); // Show success message
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      setPages([]);
    },
    onError: () => {
      setExcuting(false); // Hide loading
      setError(true); // Show error message
    },
  });

  const handlePayment = () => {
    if (!profile?.id) {
      console.error("User ID is not available.");
      return;
    }

    const pages_number = calculateTotalPages(); // This is the number of pages
    const userId = profile.id;

    console.log(userId, pages_number);

    // Trigger mutation to add pages
    addPagesMutation.mutate({
      id: userId,
      pages: pages_number,
    });
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
          <div className="flex flex-row justify-start gap-[3rem] text-[2.4rem] items-center">
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
          <button
            className="w-[20rem] text-[2.4rem] font-bold text-white bg-[#4B4DD6] p-2 hover:bg-blue-100 hover:text-blue-300 rounded-md"
            onClick={handlePayment}
          >
            Thanh toán
          </button>
        </div>
      </div>

      {/* Dialog Popup for status */}
      <DialogPopup
        isOpen={excutingDialog}
        handleClose={() => {
          setExcutingDialog(false);
        }}
      >
        {excuting && <LoadingSection />}
        {!excuting && (
          <Fragment>
            {success && (
              <p className="text-center text-xl font-medium uppercase leading-6 text-successGreen">
                Đã mua thành công, mong bạn tiếp tục in
              </p>
            )}
            {error && (
              <p className="text-center text-xl font-medium uppercase leading-6 text-alertRed">
                Đã có lỗi xảy ra, vui lòng thử lại
              </p>
            )}
          </Fragment>
        )}
      </DialogPopup>
    </div>
  );
}
