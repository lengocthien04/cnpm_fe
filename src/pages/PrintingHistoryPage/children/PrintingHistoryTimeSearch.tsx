import DateSelector from "../../../components/DateSelector/DateSelector";
import { useFormContext } from "react-hook-form";

export default function PrintingHistoryTimeSearch() {
  const { setValue } = useFormContext();

  const onChangeDateStart = (value: string) => {
    setValue("date_start", value);
  };

  const onChangeDateEnd = (value: string) => {
    setValue("date_end", value);
  };
  return (
    <div className="flex flex-row gap-[2rem] justify-start items-center pt-[0.5rem] pb-[3rem] pl-[3rem]">
      <div className="flex flex-row justify-center items-center gap-4">
        <p className="font-[700] text-[1.6rem]">Ngày bắt đầu</p>
        <DateSelector handleValueChange={onChangeDateStart} />
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <p className="font-[700] text-[1.6rem]">Ngày kết thúc</p>
        <DateSelector handleValueChange={onChangeDateEnd} />
      </div>

      <button
        type="submit"
        className="border-[0.1rem] rounded-[1rem] px-[0.8rem] py-[0.4rem] h-[3.2rem] bg-button-color hover:bg-blue-300 shadow-[1rem] text-white text-[1.4rem]"
      >
        Tìm kiếm
      </button>
    </div>
  );
}
