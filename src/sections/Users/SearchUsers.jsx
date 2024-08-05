import {useState} from 'react'
import CardWhite from '../../components/CardWhite';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import TableUsers from './TableUsers';

const SearchUsers = () => {
    const [searchDni, setSearchDni] = useState("");
    
    const handleInputSearch = (e) => {
        const value = e.target.value;
        setSearchDni(value);
      };
    
      const handleClearSearch = () => {
        setSearchDni("");
      };
    
      const handleOpenModalAdd = () => {
        setModalIsVisible(true);
      };
      const handleAddUser =()=>{
        window.location.href = "/usuarios/añadir";
      }
  return (<>
  <div className="bg-white xl:mx-72 md:mx-48 sm:mx-4 mt-4 mb-4 px-2 gap-[24px]">
    <CardWhite className="gap-5 min-w-[690px] px-6 py-4">
        
    
    <div className="container__h1 py-[10px]">
            <h1 className="text-[32px] text-[#192739] font-semibold">
              Usuarios
            </h1>
          </div>
          <div className="w-full h-11 flex gap-1.5 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Input
                value={searchDni}
                type="text"
                onChange={handleInputSearch}
                className="w-full box-border h-full bg-white border-[1.5px] border-[#1C304A] border-opacity-50 placeholder:text-[#1B2B41] placeholder:text-opacity-70 placeholder:text-lg placeholder:font-normal outline-[#1C304A] text-[#1B2B41] text-opacity-70 font-normal px-3"
                placeholder="Buscar DNI del Usuario..."
              />
              {searchDni && (
                <button
                  onClick={handleClearSearch}
                  className="absolute top-1/2 text-lg right-2 transform -translate-y-1/2"
                >
                  <IoClose className="text-[#1B2B41]" />
                </button>
              )}
            </div>
            <Button
              className="flex items-center py-1.5 px-3 gap-2 bg-[#006AF5] text-white font-normal text-lg"
              onClick={() => console.log(searchDni)}
            >
              <IoSearch className="text-white" />
              Buscar
            </Button>
            <Button
              className="flex px-[14px] box-border items-center font-normal text-lg text-[#005FDB] rounded border border-[#C3D4FF]"
              onClick={handleAddUser}
            >
              <AiOutlineUserAdd className="mr-1 text-[#005FDB] text-2xl" />
              Añadir usuario
            </Button>
          </div>
          <TableUsers/>
          </CardWhite>

    </div>
          </>
  )
}

export default SearchUsers