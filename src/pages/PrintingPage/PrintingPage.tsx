import { useState } from "react";
import LoadingSection from "../../components/loading/LoadingSection";
import printerQuery from "../../hooks/queries/usePrinterQuery";
import BranchOption from "./children/BranchOption/BranchOption";
import PrintingConfig from "./children/PrintingConfig/PrintingConfig";
import Branch from "./children/Branch";

export default function PrintingPage() {
  const { data, isLoading } = printerQuery.useListPrinters();
  const [branch, setBranch] = useState<string>("");
  const [chosenPrinter, setChosenPrinter] = useState<string>("");

  const printersCS2 = Array.isArray(data?.data)
    ? data.data.filter((printer) => printer.location.includes("CS2"))
    : [];
  const printersCS1 = Array.isArray(data?.data)
    ? data.data.filter((printer) => printer.location.includes("CS1"))
    : [];

  // Count available printers for each location without changing the original filter
  const availablePrintersCS2 = printersCS2.filter(
    (printer) => printer.status === "available"
  );
  const availablePrintersCS1 = printersCS1.filter(
    (printer) => printer.status === "available"
  );

  // Count the available printers
  const countCS2Available = availablePrintersCS2.length;
  const countCS1Available = availablePrintersCS1.length;
  // console.log(branch);
  return (
    <div className="w-full bg-white pb-[3rem]">
      {isLoading && <LoadingSection />}
      {data && !branch && (
        <BranchOption
          setbranchname={setBranch}
          count_cs1={countCS1Available}
          count_cs2={countCS2Available}
        />
      )}
      {branch && !chosenPrinter && (
        <Branch
          branch={branch}
          printers={branch === "Lý Thường Kiệt" ? printersCS1 : printersCS2}
          setChosenPrinter={setChosenPrinter}
        />
      )}
      {chosenPrinter && <PrintingConfig chosenprinter={chosenPrinter} />}
    </div>
  );
}
