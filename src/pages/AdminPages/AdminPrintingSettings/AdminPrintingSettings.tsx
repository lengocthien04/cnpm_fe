// components/AdminPrintingSettings.tsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import printingApi from "../../../api/printing.api";
import { PrintingSettings } from "../../../types/printing.type";

const initialSettings: PrintingSettings = {
  printingTimePerPaper: 2,
  pricePerPaper: 5,
  allowedFiles: ["pdf", "txt", "doc", "png"],
};

const possibleFiles = [
  "pdf",
  "txt",
  "doc",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "bmp",
  "tiff",
  "xlsx",
  "pptx",
  "csv",
];

export default function AdminPrintingSettings() {
  const { data: settingsData } = useQuery({
    queryKey: ["printing-settings"],
    queryFn: () => printingApi.getPrintingSettings(),
  });

  const [settings, setSettings] = useState<PrintingSettings>(initialSettings);
  useEffect(() => {
    if (settingsData) {
      setSettings(settingsData.data);
    }
  }, [settingsData]);

  const handleChange = (
    field: "printingTimePerPaper" | "pricePerPaper",
    value: string
  ) => {
    setSettings({
      ...settings,
      [field]: value === "" ? "" : parseFloat(value),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSettings((prevSettings) => {
      const updatedFiles = checked
        ? [...prevSettings.allowedFiles, value]
        : prevSettings.allowedFiles.filter((file) => file !== value);
      return { ...prevSettings, allowedFiles: updatedFiles };
    });
  };

  const queryClient = useQueryClient();
  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["printing-settings"] });
  };
  const savePrinttimeMutation = useMutation({
    mutationFn: printingApi.updatePrintTime,
  });
  const handleSavePrintingTime = () => {
    console.log("Updated printing time:", settings.printingTimePerPaper);
    savePrinttimeMutation.mutate(
      { time: settings.printingTimePerPaper },
      {
        onSuccess() {
          invalidateQuery();
        },
      }
    );
  };

  const savePriceMutation = useMutation({
    mutationFn: printingApi.updatePrice,
  });
  const handleSavePricePerPaper = () => {
    console.log("Updated price per paper:", settings.pricePerPaper);
    savePriceMutation.mutate(
      { price: settings.pricePerPaper },
      {
        onSuccess() {
          invalidateQuery();
        },
      }
    );
  };

  const saveFilesMutation = useMutation({
    mutationFn: printingApi.updateFiles,
  });
  const handleSaveAllowedFiles = () => {
    console.log("Updated allowed files:", settings.allowedFiles);
    saveFilesMutation.mutate(
      { files: settings.allowedFiles },
      {
        onSuccess() {
          invalidateQuery();
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Printing Settings</h2>

      <div className="space-y-4">
        {/* Printing Time Per Paper */}
        <div className="flex flex-col">
          <label className="text-xl font-semibold">
            Printing Time Per Paper (seconds)
          </label>
          <input
            type="number"
            value={settings.printingTimePerPaper}
            onChange={(e) =>
              handleChange("printingTimePerPaper", e.target.value)
            }
            className="mt-1 p-2 border rounded-lg"
            placeholder="Enter printing time per paper"
          />
          <button
            onClick={handleSavePrintingTime}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Printing Time
          </button>
        </div>

        {/* Price Per Paper */}
        <div className="flex flex-col">
          <label className="text-xl font-semibold">Price Per Paper</label>
          <input
            type="number"
            value={settings.pricePerPaper}
            onChange={(e) => handleChange("pricePerPaper", e.target.value)}
            className="mt-1 p-2 border rounded-lg"
            placeholder="Enter price per paper"
          />
          <button
            onClick={handleSavePricePerPaper}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Price Per Paper
          </button>
        </div>

        {/* Allowed File Types */}
        <div className="flex flex-col">
          <label className="text-xl font-semibold">Allowed File Types</label>
          <div className=" flex flex-col ml-4">
            {possibleFiles.map((fileType) => (
              <label key={fileType} className="flex items-center">
                <input
                  type="checkbox"
                  value={fileType}
                  checked={settings.allowedFiles.includes(fileType)}
                  onChange={handleFileChange}
                  className="mr-2"
                />
                {fileType.toUpperCase()}
              </label>
            ))}
          </div>
          <button
            onClick={handleSaveAllowedFiles}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Allowed Files
          </button>
        </div>
      </div>
    </div>
  );
}
