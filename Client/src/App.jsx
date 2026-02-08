import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const token = localStorage.getItem("access_token");

  return token ? <Dashboard /> : <AuthPage />;
}
