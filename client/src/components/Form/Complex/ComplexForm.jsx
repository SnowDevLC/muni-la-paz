import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
const { VITE_BACKEND_URL, VITE_GOOGLE_MAPS_API_KEY } = import.meta.env;
import { FaUpload } from "react-icons/fa";
import style from "./ComplexForm.module.css";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function ComplexForm({ complex, authUser }) {
  const [input, setInput] = useState({
    name: complex?.name || "",
    description: complex?.description || "",
    address: complex?.address || "",
    images: [],
    imagesPreviews: [],
    tel: complex?.tel || "",
    instagram: complex?.instagram || "",
    email: complex?.email || "",
    web: complex?.web || "",
    lat: complex?.lat || -32.2172425800549,
    lng: complex?.lng || -65.04836357980413,
  });

  const handleChange = (e, source) => {
    setInput((prevInput) => {
      if (source === "map") {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        return {
          ...prevInput,
          lat: lat,
          lng: lng,
        };
      } else if (e.target.type === "file") {
        const selectedFiles = Array.from(e.target.files);
        return {
          ...prevInput,
          images: selectedFiles,
          imagesPreviews: selectedFiles.map((file) => URL.createObjectURL(file)),
        };
      } else {
        return {
          ...prevInput,
          [e.target.name]: e.target.value,
        };
      }
    });
  };

  const removePhoto = (indexImage) => {
    setInput((prevInput) => {
      const updatedImages = prevInput.images.filter((_, index) => index !== indexImage);
      const updatedPreviews = prevInput.imagesPreviews.filter((_, index) => index !== indexImage);

      Swal.fire({
        title: "Borrar imagen",
        text: "Se borro la imagen correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      return {
        ...prevInput,
        images: updatedImages,
        imagesPreviews: updatedPreviews,
      };
    });
  };

  const selectAsMainPhoto = (indexImage) => {
    setInput((prevInput) => {
      const updatedImages = [
        prevInput.images[indexImage],
        ...prevInput.images.slice(0, indexImage),
        ...prevInput.images.slice(indexImage + 1),
      ];

      const updatedPreviews = [
        prevInput.imagesPreviews[indexImage],
        ...prevInput.imagesPreviews.slice(0, indexImage),
        ...prevInput.imagesPreviews.slice(indexImage + 1),
      ];

      Swal.fire({
        title: "Selección imagen principal",
        text: "Se selecciono correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      return {
        ...prevInput,
        images: updatedImages,
        imagesPreviews: updatedPreviews,
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
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("address", input.address);
        formData.append("tel", input.tel);
        formData.append("instagram", input.instagram);
        formData.append("email", input.email);
        formData.append("web", input.web);
        formData.append("lat", input.lat);
        formData.append("lng", input.lng);

        input.images.forEach((image) => {
          formData.append(`images`, image);
        });
        try {
          const response = await axios.post(`${VITE_BACKEND_URL}/complexes`, formData, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            setInput({
              name: "",
              description: "",
              images: [],
              imagesPreviews: [],
              address: "",
              tel: "",
              instagram: "",
              email: "",
              web: "",
              lat: -32.2172425800549,
              lng: -65.04836357980413,
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
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("address", input.address);
        formData.append("tel", input.tel);
        formData.append("instagram", input.instagram);
        formData.append("email", input.email);
        formData.append("web", input.web);
        formData.append("lat", input.lat);
        formData.append("lng", input.lng);
        formData.append("check", false);

        if (input.images.length) {
          input.images.forEach((image) => {
            formData.append(`images`, image);
          });
        }
        try {
          const response = await axios.patch(`${VITE_BACKEND_URL}/complexes/${complex.id}`, formData, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            setInput({
              name: "",
              description: "",
              images: [],
              imagesPreviews: [],
              address: "",
              tel: "",
              instagram: "",
              email: "",
              web: "",
              lat: -32.2172425800549,
              lng: -65.04836357980413,
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
      {complex ? (
        <div className={style.content}>
          <h1>Editar Alojamiento</h1>
          <form onSubmit={handleEdit} className={style.form} encType="multipart/form-data">
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
                Descripción{" "}
                <textarea
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  placeholder="Descripción"
                  className={style.inputDescription}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                Dirección{" "}
                <input
                  type="text"
                  name="address"
                  value={input.address}
                  onChange={handleChange}
                  placeholder="Dirección"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <div className={style.inputMap}>
                Seleccionar ubicación{" "}
                <LoadScript googleMapsApiKey={VITE_GOOGLE_MAPS_API_KEY}>
                  <GoogleMap
                    center={{ lat: input.lat, lng: input.lng }}
                    zoom={15}
                    onClick={(event) => handleChange(event, "map")}
                    mapContainerStyle={{ width: "80%", height: "500px" }}
                  >
                    <Marker position={{ lat: input.lat, lng: input.lng }} />
                  </GoogleMap>
                </LoadScript>
              </div>
              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                Tel/Whatsapp{" "}
                <input
                  type="phone"
                  name="tel"
                  value={input.tel}
                  onChange={handleChange}
                  placeholder="Tel/Whatsapp"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                Instagram{" "}
                <input
                  type="phone"
                  name="instagram"
                  value={input.instagram}
                  onChange={handleChange}
                  placeholder="Instagram"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                E-mail{" "}
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                Web{" "}
                <input
                  type="url"
                  name="web"
                  value={input.web}
                  onChange={handleChange}
                  placeholder="Web"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                Click para subir Imágenes
                <input type="file" multiple className={style.inputFile} onChange={handleChange} />
                <FaUpload className={style.icon} />
              </label>
              {input.imagesPreviews && (
                <div className={style.gridImages}>
                  {input.imagesPreviews.map((link, index) => (
                    <div key={index} className={style.divImage}>
                      <img src={link} alt={`imagen ${index}`} />
                      <div className={style.buttonsImage}>
                        <button type="button" className={style.btnDelete} onClick={() => removePhoto(index)}>
                          eliminar
                        </button>
                        {index !== 0 && (
                          <button type="button" className={style.btn} onClick={() => selectAsMainPhoto(index)}>
                            hacer principal
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className={style.btn}>
              EDITAR
            </button>
          </form>
        </div>
      ) : (
        <div className={style.content}>
          <h2>Crear Alojamiento</h2>
          <form onSubmit={handleCreate} className={style.form} encType="multipart/form-data">
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
                Descripción{" "}
                <textarea
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  placeholder="Descripción"
                  className={style.inputDescription}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                Dirección{" "}
                <input
                  type="text"
                  name="address"
                  value={input.address}
                  onChange={handleChange}
                  placeholder="Dirección"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <div className={style.inputMap}>
                Seleccionar ubicación{" "}
                <LoadScript googleMapsApiKey={VITE_GOOGLE_MAPS_API_KEY}>
                  <GoogleMap
                    center={{ lat: input.lat, lng: input.lng }}
                    zoom={15}
                    onClick={(event) => handleChange(event, "map")}
                    mapContainerStyle={{ width: "80%", height: "500px" }}
                  >
                    <Marker position={{ lat: input.lat, lng: input.lng }} />
                  </GoogleMap>
                </LoadScript>
              </div>
              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                Tel/Whatsapp{" "}
                <input
                  type="phone"
                  name="tel"
                  value={input.tel}
                  onChange={handleChange}
                  placeholder="Tel/Whatsapp"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                Instagram{" "}
                <input
                  type="phone"
                  name="instagram"
                  value={input.instagram}
                  onChange={handleChange}
                  placeholder="Instagram"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                E-mail{" "}
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                Web{" "}
                <input
                  type="url"
                  name="web"
                  value={input.web}
                  onChange={handleChange}
                  placeholder="Web"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                Click para subir Imágenes
                <input type="file" multiple className={style.inputFile} onChange={handleChange} />
                <FaUpload className={style.icon} />
              </label>
              {input.imagesPreviews && (
                <div className={style.gridImages}>
                  {input.imagesPreviews.map((link, index) => (
                    <div key={index} className={style.divImage}>
                      <img src={link} alt={`imagen ${index}`} />
                      <div className={style.buttonsImage}>
                        <button type="button" className={style.btnDelete} onClick={() => removePhoto(index)}>
                          eliminar
                        </button>
                        {index !== 0 && (
                          <button type="button" className={style.btn} onClick={() => selectAsMainPhoto(index)}>
                            hacer principal
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
