export interface PrintingSettings {
  printingTimePerPaper: number;
  pricePerPaper: number;
  allowedFiles: string[];
}

export interface PrintingSettingsUpdate {
  price?: number;
  time?: number;
  files?: string[];
}
