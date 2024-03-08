import { useState } from "react";
const { VITE_BACKEND_URL } = import.meta.env;
import axios from "axios";
import Swal from "sweetalert2";
import style from "./UserForm.module.css";

export default function UserForm({ user, authUser }) {

  const allTypes = ["Admin", "Basic"];
  const [input, setInput] = useState({
    name: user?.name || "",
    email: user?.email || "",
    rol: user?.rol || "Basic"
  });

  const handleChange = (e) => {
    setInput((prevInput) => {
      return {
        ...prevInput,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirmación",
      text: `Confirma CREAR`,
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(`${VITE_BACKEND_URL}/users`, input, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            setInput({
              name: "",
              email: "",
              rol: "",
            });
            Swal.fire({
              title: "Creado",
              text: "Se creo correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 2500,
            });
            window.location.reload();
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: `${error.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      }
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirmación",
      text: `Confirma EDITAR`,
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.patch(`${VITE_BACKEND_URL}/users/${user.id}`, input, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            setInput({
              name: "",
              email: "",
              rol: "",
            });
            Swal.fire({
              title: "Actulaizado",
              text: "Se actualizo correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 2500,
            });
            window.location.reload();
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: `${error.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      }
    });
  };

  return (
    <div>
      {user ? (
        <div className={style.content}>
          <h1>Editar Usario: {user.name}</h1>
          <form onSubmit={handleEdit} className={style.form}>
          <div className={style.divInput}>
              <label>
                Nombre{" "}
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>
            <div className={style.divInput}>
              <label>
                Email{" "}
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                Tipo de Usuario
                <select name="rol" value={input.rol} onChange={handleChange}>
                  {allTypes?.map((rol, index) => {
                    return <option key={index}>{rol}</option>;
                  })}
                </select>
              </label>
            </div>
            <button type="submit" className={style.btn}>
              EDITAR
            </button>
          </form>
        </div>
      ) : (
        <div className={style.content}>
          <h2>Crear Usuario</h2>
          <form onSubmit={handleCreate} className={style.form}>
            <div className={style.divInput}>
              <label>
                Nombre{" "}
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>
            <div className={style.divInput}>
              <label>
                Email{" "}
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                Tipo de Usuario
                <select name="rol" value={input.rol} onChange={handleChange}>
                  {allTypes?.map((rol, index) => {
                    return <option key={index}>{rol}</option>;
                  })}
                </select>
              </label>
            </div>

            <button type="submit" className={style.btn}>
              CREAR
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
