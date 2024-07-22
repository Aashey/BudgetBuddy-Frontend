import { RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import { routes } from "./routes/routes";

function App() {
  return (
    <RouterProvider router={routes}>
      <Login />
    </RouterProvider>
  );
}

export default App;
