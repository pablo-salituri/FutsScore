import { Routes, Route /* , useLocation */ } from "react-router-dom";
import MainPage from "./Components/MainPage/MainPage";
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin/Admin";
import AddItem from "./Components/Admin/AddItem/AddItem";
import UpdateItem from "./Components/Admin/UpdateItem/UpdateItem";
import AdminTools from "./Components/Admin/AdminTools/AdminTools";
// import "./App.css";

function App() {
  // const location = useLocation();

  return (
    <div>
      {/* {!location.pathname.includes('/admin') && (
      <div className='superiorContainer'>
        <NavSuperior />
        <Nav />
      </div>
    )} */}

      {/* <div className='generalContainer'> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/addItem" element={<AddItem />} />
        <Route path="/admin/updateItem/:id" element={<UpdateItem />} />
        <Route path="/admin/AdminTools" element={<AdminTools />} />
        {/* <Route path="/properties/:id" element={<Detail />} /> */}

        {/* <Route path="*" element={<UnknownRoute />} /> */}

        {/* <Route element={<ProtectedRoutes allowedRoles={["admin", 'editor']} />}>
          <Route path="/admin" element={<HomeDash />} />
          <Route path="/admin/editarPropiedad/:id" element={<EditPropertyForm />} />
          <Route path="/admin/crearPropiedad" element={<CreateForm/>} />
          <Route path="/admin/datosPersonales" element={<PersonalData/>} />
        </Route> */}
      </Routes>
      {/* </div> */}
      {/* {!location.pathname.includes('/admin') && <Footer />} */}
    </div>
  );
}
export default App;
