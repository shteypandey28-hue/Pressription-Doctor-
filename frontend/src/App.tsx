import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/pages/Dashboard";
import { Prescriptions } from "@/pages/Prescriptions";
import { Medicines } from "@/pages/Medicines";
import { Patients } from "@/pages/Patients";
import { Settings } from "@/pages/Settings";
import { Landing } from "@/pages/Landing";
import { AuthPage } from "@/pages/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthPage />} />

        <Route path="/app" element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="medicines" element={<Medicines />} />
            <Route path="patients" element={<Patients />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
