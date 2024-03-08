import { Routes, Route /* , useLocation */ } from "react-router-dom";
import MainPage from "./Components/MainPage/MainPage";
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin/Admin";
import AddItem from "./Components/Admin/AddItem/AddItem";
import UpdateItem from "./Components/Admin/UpdateItem/UpdateItem";
import AdminTools from "./Components/Admin/AdminTools/AdminTools";
import ProtectedRoutes from "./Components/Firebase/ProtectedRoutes";
// import "./App.css";

function App() {
  // const location = useLocation();

  return (
    <div>
      {/* <div className='generalContainer'> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="*" element={<UnknownRoute />} /> */}

        <Route element={<ProtectedRoutes />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/addItem" element={<AddItem />} />
          <Route path="/admin/updateItem/:id" element={<UpdateItem />} />
          <Route path="/admin/AdminTools" element={<AdminTools />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
