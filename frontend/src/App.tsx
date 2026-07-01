import AdminPage from "./admin/pages/AdminPage";
import HomePage from "./pages/HomePage";

function App() {
  if (window.location.pathname.startsWith("/admin")) {
    return <AdminPage />;
  }

  return <HomePage />;
}

export default App;
