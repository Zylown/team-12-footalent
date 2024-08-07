import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from 'react-dropzone';
import CardWhite from "../../../components/CardWhite";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import soporteSchema from "../../../validations/soporte";
import { createMessage } from "../../../api/support/apiSupport";

const Soporte = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rejectedFiles, setRejectedFiles] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(soporteSchema),
  });

  const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];

  const onDrop = (acceptedFiles, fileRejections) => {
    if (acceptedFiles.length > 0) {
      // Si hay archivos aceptados, actualiza el estado
      setValue("photo", acceptedFiles[0]);
    }
    if (fileRejections.length > 0) {
      // Maneja los archivos rechazados
      setRejectedFiles(fileRejections);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedTypes,
    maxSize: 10485760, // 10 MB
    onDrop,
    onDropRejected: (rejectedFiles) => {
      setRejectedFiles(rejectedFiles);
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("first_name", data.name);
      formData.append("last_name", data.lastName);
      formData.append("email", data.email);
      formData.append("issue_details", data.details);
      if (data.photo) {
        formData.append("image", data.photo);
      }

      await createMessage(formData);
      setSuccessMessage("Mensaje enviado con éxito");
    } catch (error) {
      setErrorMessage("Error al enviar el mensaje. Inténtalo de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnCancel = () => {
    // Lógica para manejar la cancelación si es necesario
  };

  return (
    <div className="flex justify-center items-center pt-4">
      <CardWhite className="bg-white min-w-[568px] p-6">
        <div className="pb-6">
          <h2 className="text-[32px] font-semibold text-[#192739]">
            Soporte
          </h2>
        </div>
        {Object.keys(errors).length > 0 && (
          <p className="text-red-600 text-sm font-normal">
            {"Estos campos son requeridos"}
          </p>
        )}
        {successMessage && (
          <p className="text-green-600 text-sm font-normal">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="text-red-600 text-sm font-normal">
            {errorMessage}
          </p>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-row flex gap-6">
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                Nombre *
              </label>
              <Input
                className={`bg-white placeholder:text-[#c4cbd3] 
                placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none
                ${errors.name ? "border-red-600 border-2" : ""}
                `}
                type="text"
                placeholder="Ingrese el nombre"
                {...register("name")}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                Apellido *
              </label>
              <Input
                className={`bg-white placeholder:text-[#c4cbd3] 
                placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none
                ${errors.lastName ? "border-red-600 border-2" : ""}`}
                type="text"
                placeholder="Ingrese el apellido"
                {...register("lastName")}
              />
            </div>
          </div>
          
          <div className="flex-row w-full flex gap-4">
            <div className="flex flex-col w-full gap-2">
              <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                Correo electrónico *
              </label>
              <Input
                className={`bg-white placeholder:text-[#c4cbd3] 
                placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none
                ${errors.email ? "border-red-600 border-2" : ""}`}
                type="text"
                placeholder="Ingrese el correo electrónico"
                {...register("email")}
              />
            </div>
          </div>
          <div className="flex-row w-full flex gap-4">
            <div className="flex flex-col w-full gap-2">
              <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                Detalles del problema * 
              </label>
              <Input
                className={`bg-white placeholder:text-[#c4cbd3] 
                placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none 
                ${errors.details ? "border-red-600 border-2" : ""}`}
                type="text"
                placeholder="Por favor, bríndenos con detalles sobre su problema y lo solucionaremos. Muchas gracias!"
                {...register("details")}
              />
            </div>
          </div>
          
          <div className="flex flex-col w-full">
            <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
              Adjuntar imágenes
            </label>
            <div
              {...getRootProps({ className: 'dropzone border border-dashed rounded-lg border-gray-300 p-4 text-center cursor-pointer' })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-gray-500">Suelta la foto aquí...</p>
              ) : (
                <p className="text-gray-500">Arrastra una foto aquí, o haz clic para seleccionar</p>
              )}
            </div>
            {rejectedFiles.length > 0 && (
              <aside>
                <h4 className="text-red-600">Archivos rechazados:</h4>
                <ul>
                  {rejectedFiles.map(({ file, errors }) => (
                    <li key={file.path}>
                      {file.path} - {file.size} bytes
                      <ul>
                        {errors.map(e => (
                          <li key={e.code} className="text-red-600">{e.message}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>

          <div className="flex flex-col w-full">
            <Button type="submit" className="bg-[#006AF5] text-white" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
            <Button
              type="button"
              className="bg-white text-[#006AF5] font-light"
              onClick={handleOnCancel}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardWhite>
    </div>
  );
}

export default Soporte;
