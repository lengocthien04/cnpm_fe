import { useContext } from "react";
import "./App.css";
import ScrollToTop from "./components/utils/ScrollToTop";
import useRouteElements from "./hooks/useRouteElements";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { AppProvider } from "./contexts/app.context";
import LoadingPage from "./components/loading/LoadingPage";
import { AppContext } from "./contexts/app.context";
import { AdminProvider } from "./contexts/admin.context";

function AppIner() {
  const routes = useRouteElements();
  const { loadingPage } = useContext(AppContext);

  return (
    <div
      style={{
        minHeight: "inherit",
      }}
    >
      {routes}
      {loadingPage && <LoadingPage />}
    </div>
  );
}

function App() {
  return (
    <ScrollToTop>
      <PrimeReactProvider>
        <AppProvider>
          <AdminProvider>
            <AppIner />
          </AdminProvider>
        </AppProvider>
      </PrimeReactProvider>
    </ScrollToTop>
  );
}

export default App;
