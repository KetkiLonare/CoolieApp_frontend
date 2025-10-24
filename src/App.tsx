import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import BookService from "./pages/BookService";
import MyBookings from "./pages/MyBookings";
import Translator from "./pages/Translator";
import TourismExplorer from "./pages/TourismExplorer";
import AdminDashboard from "./pages/AdminDashboard";
import SuccessPage from "./pages/SuccessPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/theme.css"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<BookService />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/explorer" element={<TourismExplorer />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/success" element={<SuccessPage />} />
      </Route>
    </Routes>
  );
}

export default App;
