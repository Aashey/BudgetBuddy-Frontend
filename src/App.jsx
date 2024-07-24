import { RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import { routes } from "./routes/routes";
import { QueryClientProvider, QueryClient } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}>
        <Login />
      </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
