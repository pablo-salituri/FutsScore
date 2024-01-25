import { Routes, Route /* , useLocation */ } from "react-router-dom";
import MainPage from "./Components/MainPage/MainPage";
import Admin from "./Components/Admin/Admin";
import AddItem from "./Components/Admin/AddItem/AddItem";
import EditItem from "./Components/Admin/EditItem/EditItem";
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
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/addItem" element={<AddItem />} />
        <Route path="/admin/editItem" element={<EditItem />} />
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
