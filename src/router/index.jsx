import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../modules/Components/Signup";
import Login from "../modules/Components/Login";
import Home from "../modules/Components/Home";
import ForgetPass from "../modules/Components/ForgetPass";
import VarifyEmail from "../modules/Components/VarifyEmail";

const HomePage = lazy(() => import("../modules/home"));

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div className="grid place-content-center h-screen w-screen"></div>
      }
    >
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/varify_email" element={<VarifyEmail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home_page" element={<Home />} />
        <Route path="/forget_password" element={<ForgetPass />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
