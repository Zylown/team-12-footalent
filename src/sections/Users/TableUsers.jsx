import Button from "../../components/Button"
import { TbUserMinus } from "react-icons/tb";

const TableUsers = () => {
    const users = [{
        name:"Gaston",
        lastName: "Benitez",
        role: "odontologo",
        dni: "40622598"
    },
    {
        name:"Gaston",
        lastName: "Benitez",
        role: "odontologo",
        dni: "40622598"
    },
    {
        name:"Gaston",
        lastName: "Benitez",
        role: "odontologo",
        dni: "40622598"
    },
    {
        name:"Gaston",
        lastName: "Benitez",
        role: "odontologo",
        dni: "40622598"
    },
]
    
    const handleDeletedUser =(data)=>{
        console.log(data);
    }
  return (
    <div className=" min-w-[744px] border rounded-md bg-bgTable  py-[16px] ">
    <table className="w-full ">
               
                <thead className="space-y-1">
                  <tr className="  space-y-1 space-x-3  rounded-md">
                    <td className="p-1  text-center w-1/4">
                        <h3 className="border rounded-md p-2 bg-custom-gradient">ROL</h3>
                    </td>
                    <td className="p-1 w-1/4  text-center">
                        <h3 className="border rounded-md p-2  bg-custom-gradient">DNI</h3>
                    </td>
                    <td className="p-1 w-full  text-center">
                        <h3 className="border rounded-md p-2 mr-2 bg-custom-gradient">NOMBRE Y APELLIDO</h3>
                    </td>
                  </tr>
                </thead>
          <tbody className="space-y-1 rounded-md ">
          {users.map((user, index) => (
              <tr key={index} className="space-x-3 ">
                <td className=" text-center p-1 w-1/4">

                  <p className="border rounded-md p-2 bg-white"> {user.role}</p>

                </td>
                <td className="  text-center p-1 w-1/4">

                  <p className="border rounded-md p-2 bg-white"> {user.dni}</p>

                </td>
                <td className=" p-1 w-full">
                
                  <div className="flex items-center justify-center relative">
                    <p className="w-full p-2 rounded-md border text-center mr-2 bg-white">{user.name + user.lastName} </p>
                    
                  <Button
                      type="button"
                      onClick={() => handleDeletedUser(user)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent p-1 "
                    >
                    <TbUserMinus className="text-[#7d8693]"/>
                    </Button>
                    </div>
                </td>

              </tr>
         ))}
          </tbody>
        
        </table>
        </div>
  )
}

export default TableUsers