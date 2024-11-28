import { useContext } from "react";
import { AppContext } from "../../contexts/app.context";
import BeforeLogin from "./children/BeforeLogin/BeforeLogin";
import AfterLogin from "./children/AfterLogin/AfterLogin";
import PrintingConfig from "../../components/PrintingConfig/PrintingConfig";
import UserPage from "../UserPage/UserPage";

export default function HomePage() {
  const { isAuthenticated } = useContext(AppContext);
  // return <div>{isAuthenticated ? <BeforeLogin /> : <AfterLogin />}</div>;
  // return <PrintingConfig />
  return <UserPage />
}
