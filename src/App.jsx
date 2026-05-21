import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LenisProvider } from "./hooks/useLenis.jsx";
import HomePage from "./pages/HomePage.jsx";
import WorkDetailPage from "./pages/WorkDetailPage.jsx";

export default function App() {
  return (
    <LenisProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:id" element={<WorkDetailPage />} />
        </Routes>
      </BrowserRouter>
    </LenisProvider>
  );
}
