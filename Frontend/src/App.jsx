import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./app/components/routes/Routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

