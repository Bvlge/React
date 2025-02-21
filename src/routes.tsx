import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
