import printerQuery from "../../../hooks/queries/usePrinterQuery";
import LoadingSection from "../../../components/loading/LoadingSection";
import AdminPrinterCard from "./AdminPrinterCard";

export default function AdminPrinterList() {
  const { data: printerData, isFetched } = printerQuery.useListPrinters();
  const printers = printerData?.data || [];
  return (
    <div className="p-6 flex flex-col gap-6">
      {!isFetched && <LoadingSection />}
      {isFetched &&
        printers.map((printer) => (
          <AdminPrinterCard key={printer.id} printer={printer} />
        ))}
    </div>
  );
}
