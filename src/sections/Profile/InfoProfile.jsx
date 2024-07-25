import CardWhite from "../../components/CardWhite"
import Button from "../../components/Button"
import imgProfile from "../../assets/ImgProfile.svg"
const  user = {
first_name: "Marcelo",
  last_name: "Tinelli",
  dni: "1111111",
  email: "Tinelli@gmail.com",
  phone_number: "124566522",
  role_id: 1
}
const InfoProfile = () => {
  return (
    <div className="bg-white xl:mx-72 md:mx-48 sm:mx-4 mt-6 px-2">

   <CardWhite className="p-6">
   <div className="bg-white rounded-lg flex items-start">
      {/* Imagen del Usuario */}
      <div className=" items-center">
      <img src={imgProfile} alt="Perfil del Usuario" className="w-25 h-25 object-cover mr-6" />
      <Button 
      type="button"
      className="flex justify-center rounded-md px-6 bg-white py-1.5 text-sm font-semibold leading-6  "
      >
        Subir imagen
      </Button>
      </div>
      {/* Información del Usuario */}
      <div className="flex flex-col justify-center space-y-4">
        <div>
          <h2 className="text-xl font-bold">{user.first_name} {user.last_name}</h2>
        </div>
        <div> 
            <p className="text-gray-700"> <strong>Rol:</strong> { user.role_id === 1 ?  "Secretario": "Odontólogo" }</p>
        </div>
        <div>
          <p className="text-gray-700"><strong>DNI:</strong> {user.dni}</p>
        </div>
        <div>
          <p className="text-gray-700"><strong>Correo Electrónico:</strong> {user.email}</p>
        </div>
      </div>
    </div>
   </CardWhite>
   </div>
   )
}


export default InfoProfile