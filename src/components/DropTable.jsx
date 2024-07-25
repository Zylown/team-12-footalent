import Button from "./Button"
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const Table = ({ nameButton, userRole, sections }) => {
  //seteo y funcion para desplegar la tabla
  const [isOpen, setIsOpen] = useState(false);

  const toggleTable = () => {
    setIsOpen(!isOpen);
  };
//deberia guardar loq que se cambia
  const handleInputChange = (e, sectionIndex, fieldName) => {
    const { value } = e.target;
    const updatedSections = [...sections];
    updatedSections[sectionIndex][fieldName] = value;
    setSections(updatedSections);
  };

  return (

    <div className="border rounded-md">
      <Button
        type="button"
        onClick={toggleTable}
        className="bg-gradiant p-4 w-full text-xl flex justify-center items-center"
      >
        {nameButton}
        {isOpen ? <FaCaretUp className="ml-2" /> : <FaCaretDown className="ml-2" />}
      </Button>
      {isOpen && (
        <table className="w-full border-collapse">
          <tbody className="space-y-1">
            {sections.map((section, index) => (
              <tr key={index} className="space-x-2">
                <td className="p-2  text-center w-1/4">

                  <p className="border rounded-md p-2"> {section.nombre}</p>

                </td>
                <td className=" w-3/4">
                  <div className="flex items-center justify-center relative">  <input
                    type="text"
                    name="value"
                    value={section.value}
                    onChange={(e) => handleInputChange(e, index, 'value')}
                    className={`w-full p-2 rounded-md text-center bg-gray-100 mr-2`}
                    readOnly={userRole !== 'admin'}
                  />
                    <Button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent p-1"
                    >
                      {section.icon && section.icon}
                    </Button>
                    </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

  );
};

export default Table;