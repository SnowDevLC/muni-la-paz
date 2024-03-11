import { Routes, Route, useLocation } from "react-router-dom";
import { NavBar, Footer } from "./components";
import { Contacts, Home, Publications, Login, Dashboard, Complexes, ComplexDetail, PublicationDetail } from "./views";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComplexes, getPublications } from "./redux/actions";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

import "./App.css";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const allPublications = useSelector((state) => state.publications);
  const allComplexes = useSelector((state) => state.complexes);

  const events = allPublications
  .filter((publication) => publication.check && publication.isEvent)
  .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
  const sports = allPublications.filter((publication) => publication.type === "Deporte" && publication.check);
  const health = allPublications.filter((publication) => publication.type === "Salud" && publication.check);
  const culture = allPublications.filter((publication) => publication.type === "Cultura" && publication.check);
  const services = allPublications.filter((publication) => publication.type === "Servicio" && publication.check);
  const tourism = allPublications.filter((publication) => publication.type === "Turismo" && publication.check);
  const institutional = allPublications.filter(
    (publication) => publication.type === "Institucional" && publication.check
  );
  const advice = allPublications.filter((publication) => publication.type === "Concejo" && publication.check);

  const complexes = allComplexes.filter((complex) => complex.check);

  useEffect(() => {
    dispatch(getComplexes()).then(() => dispatch(getPublications()));
  }, []);

  return (
    <div className="container">
      {!location.pathname.startsWith("/dashboard") && <NavBar />}
      <Routes>
        <Route exact path="/" element={<Home publications={allPublications} complexes={allComplexes} />} />
        <Route exact path="/contacto" element={<Contacts />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/alojamientos" element={<Complexes complexes={complexes} />} />
        <Route exact path="/alojamientos/:id" element={<ComplexDetail />} />
        <Route exact path="/noticia/:id" element={<PublicationDetail />} />
        <Route exact path="/noticias" element={<Publications />} />
        <Route exact path="/cultura" element={<Publications items={culture} />} />
        <Route exact path="/salud" element={<Publications items={health} />} />
        <Route exact path="/deportes" element={<Publications items={sports} />} />
        <Route exact path="/eventos" element={<Publications items={events} />} />
        <Route exact path="/servicios" element={<Publications items={services} />} />
        <Route exact path="/turismo" element={<Publications items={tourism} />} />
        <Route exact path="/institucional" element={<Publications items={institutional} />} />
        <Route exact path="/concejo" element={<Publications items={advice} />} />
        <Route
          exact
          path="/dashboard/*"
          element={
            <RequireAuth fallbackPath={"/login"}>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
      {!location.pathname.startsWith("/dashboard") && <Footer />}
    </div>
  );
}

export default App;
