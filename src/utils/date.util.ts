// Function to convert Date to 'yyyy-mm-dd' string
export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Function to convert 'yyyy-mm-dd' string back to Date
export const parseStringToDate = (dateString: string): Date | null => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return null; // Return null if the string format is invalid
  }

  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // Months are zero-indexed in Date object
};
