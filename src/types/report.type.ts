export interface UserPageUsage {
  [key: string]: {
    name: string;
    used_pages: number;
  };
}

interface ReportPrinjob {
  id: string;
  created_at: string;
  deleted_at: null;
  updated_at: string;
  page_size: number[];
  copies: number;
  num_pages: number;
  duplex: boolean;
  print_status: string;
  user: {
    id: string;
    name: string;
  };
  printer: {
    id: string;
    location: string;
    printer_code: string;
  };
  file: {
    id: string;
    name: string;
    path: string;
  };
}

interface ReportNotify {
  id: string;
  created_at: string;
  message: string;
}

export interface PrintingReport {
  total_printed_pages: number;
  printjobs: ReportPrinjob[];
  user_page_usage: UserPageUsage;
  notifications: ReportNotify[];
  start_date: Date;
  end_date: Date;
}
