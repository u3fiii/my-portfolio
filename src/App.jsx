import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageBackground from "./components/layout/PageBackground.jsx";
import { LenisProvider } from "./hooks/useLenis.jsx";
import HomePage from "./pages/HomePage.jsx";
import WorkDetailPage from "./pages/WorkDetailPage.jsx";

export default function App() {
  return (
    <>
      <PageBackground />
      <LenisProvider>
        <div className="page-content">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/work/:id" element={<WorkDetailPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </LenisProvider>
    </>
  );
}
