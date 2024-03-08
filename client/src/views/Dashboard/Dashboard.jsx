import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { ComplexesDashboard, PublicationsDashboard, Panel, SideBar, UsersDashboard } from "../../components";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getComplexes, getPublications, getUsers } from "../../redux/actions";
import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("");
  const [input, setInput] = useState({
    password: "",
    passwordRepeat: "",
  });

  const signOut = useSignOut();
  const [_, token] = useAuthHeader().split(" ");
  const authUser = { ...useAuthUser(), token };
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const allPublications = useSelector((state) => state.publications);
  const allComplexes = useSelector((state) => state.complexes);
  const allUsers = useSelector((state) => state.users);

  const sumObjectsDisable = (array) => {
    return array.reduce((total, currentObject) => {
      if (currentObject.check === false || currentObject.active === false) {
        return total + 1;
      } else {
        return total;
      }
    }, 0);
  };

  const sumTotal = sumObjectsDisable(allPublications) + sumObjectsDisable(allComplexes) + sumObjectsDisable(allUsers);

  const signOutAction = () => {
    signOut();
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getComplexes()).then(() => dispatch(getPublications()).then(() => dispatch(getUsers(token))));
  }, []);

  const handleLinkClick = (component) => {
    setActiveComponent(component);
  };

  const handleInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handlePasswordChanged = async (event) => {
    event.preventDefault();
    const formatedInput = {
      password: input.passwordRepeat,
      updatePassword: true,
    };
    try {
      const response = await axios.patch(`${VITE_BACKEND_URL}/users`, formatedInput, {
        headers: { Authorization: authUser.token },
      });
      if (response.status === 200) {
        signOut();
        setInput({
          email: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (authUser?.passwordChanged === false) {
    return (
      <div className={style.body}>
        <div className={style.container}>
          <form onSubmit={handlePasswordChanged} className={style.form}>
            <h2>Debe cambiar su contraseña</h2>
            <div className={style.inputDiv}>
              <label>
                Contraseña
                <div className={style.input}>
                  <BsFillShieldLockFill className={style.icon} />
                  <input type="password" name="password" placeholder="Ingrese Contraseña" onChange={handleInput} />
                </div>
              </label>
            </div>
            <div className={style.inputDiv}>
              <label>
                Repita la Contraseña
                <div className={style.input}>
                  <BsFillShieldLockFill className={style.icon} />
                  <input
                    type="password"
                    name="passwordRepeat"
                    placeholder="Ingrese Contraseña"
                    onChange={handleInput}
                  />
                </div>
              </label>
            </div>
            <button type="submit" className={style.btn}>
              <span>Cambiar</span>
              <FaArrowRightLong className={style.icon} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={style.body}>
      <div className={style.container}>
        <SideBar user={authUser} signOut={signOutAction} onLinkClick={handleLinkClick} />
        <div className={style.mainContent}>
          {activeComponent === "" && (
            <Panel
              authUser={authUser}
              notifications={sumTotal}
              publications={allPublications}
              complexes={allComplexes}
              users={allUsers}
            />
          )}
          {activeComponent === "publications" && (
            <PublicationsDashboard publications={allPublications} authUser={authUser} />
          )}
          {activeComponent === "complexes" && <ComplexesDashboard complexes={allComplexes} authUser={authUser} />}
          {activeComponent === "users" && authUser.rol && <UsersDashboard users={allUsers} authUser={authUser} />}
        </div>
      </div>
    </div>
  );
}
