import Button from '../../components/Button'
import InputPassword from '../../components/InputPassWord'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { useState } from 'react'

const ConfigProfile = () => {
  // info que vendria desde el back
  const Contraseña = "contraseña"
  const [isOpen, setIsOpen] = useState(false);
 //funcio para desplegar la tabla
  const toggleTable = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border rounded-md">
      <Button
        type="button"
        onClick={toggleTable}
        className="bg-gradiant p-4 w-full text-xl flex justify-center items-center"
      >
        Configuración
        {isOpen ? <FaCaretUp className="ml-2" /> : <FaCaretDown className="ml-2" />}
      </Button>
      {isOpen && (
        <table className="w-full border-collapse">
          <tbody className="space-y-1">

            <tr className="space-x-2">
              <td className="p-2  text-center w-1/4">

                <p className="border rounded-md p-2"> Contraseña</p>

              </td>
              <td className=" w-3/4">
                <div className='mr-2'>
                  <InputPassword
                    name="value"
                    value={Contraseña}
                    placeholder={""}
                    className="w-full p-2 rounded-md text-center bg-gray-100 !mr-2"
                    readOnly={true}
                  /></div>
              </td>

            </tr>
            <tr className="space-x-2">
              <td className="p-2  text-center w-1/4">

                <p className="border rounded-md p-2 text-white"> p</p>

              </td>
              <td className="text-center w-3/4">
                <div className='mr-2'>
                  <Button className="w-full text-mainBlue border !mr-2"  >
                    Cambiar contraseña
                  </Button></div>
              </td>

            </tr>

            <tr className="space-x-2">
              <td className="p-2  text-center w-1/4">

                <p className="border rounded-md p-2"> Soporte</p>

              </td>
              <td className=" text-center w-3/4">
                <div className='mr-2'>
                  <Button className="w-full text-mainBlue border !mr-2" >
                    Contactar a soporte
                  </Button>
                </div>
              </td>

            </tr>

          </tbody>
        </table>
      )}
    </div>
  )
}

export default ConfigProfile