export default function PrintingPage() {
  const sum = (a: number, b: number) => {
    return a + b;
  };
  return <div className="flex justify-center text-5xl">{sum(9, 6)}</div>;
}
