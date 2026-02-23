import { AuthProvider } from "./context/AuthContext";
import { FilterProvider } from "./context/FilterContext";
import ReactDOM from "react-dom/client";   // ✅ IMPORTANT
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
  </AuthProvider>
);