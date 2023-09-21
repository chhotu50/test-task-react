import { BrowserRouter, Routes, Route } from "react-router-dom";
import ButtonA from "./pages/ButtonA";
import ButtonB from "./pages/ButtonB";
import Home from "./pages/Home";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="button-a" element={<ButtonA />} />
        <Route path="button-b" element={<ButtonB />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
