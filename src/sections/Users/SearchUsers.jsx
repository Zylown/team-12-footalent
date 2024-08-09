import { useState, useCallback, useEffect } from 'react';
import CardWhite from '../../components/CardWhite';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { IoSearch, IoClose } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import TableUsers from './TableUsers';
import { apiGetUsers } from "../../api/users/apiUsers";

const SearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    const usersData = await apiGetUsers();
    setUsers(usersData.data);
    setFilteredUsers(usersData.data);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleInputSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => 
        user.dni.includes(value) || 
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(value.toLowerCase())
      ));
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredUsers(users);
  };

  const handleAddUser = () => {
    window.location.href = "/usuarios/añadir";
  };

  return (
    <div className="bg-white xl:mx-72 md:mx-48 sm:mx-4 mt-4 mb-4 px-2 gap-[24px]">
      <CardWhite className="gap-5 sm:min-w-[690px] w-full sm:px-6 px-2 py-4">
        <div className="container__h1 py-[10px]">
          <h1 className="text-[32px] text-[#192739] font-semibold">
            Usuarios
          </h1>
        </div>
        <div className="w-full flex gap-1.5 flex-col md:flex-row">
          <div className="flex-1 relative">
            <Input
              value={searchQuery}
              type="text"
              onChange={handleInputSearch}
              className="w-full box-border h-full bg-white border-[1.5px] border-[#1C304A] border-opacity-50 placeholder:text-[#1B2B41] placeholder:text-opacity-70 placeholder:text-lg placeholder:font-normal outline-[#1C304A] text-[#1B2B41] text-opacity-70 font-normal px-3"
              placeholder="Buscar DNI o Nombre del Usuario..."
            />
            {searchQuery === "" ? (
              <IoSearch className="absolute top-1/2 text-lg right-2 transform -translate-y-1/2 text-[#1B2B41]" />
            ) : (
              <button
                onClick={handleClearSearch}
                className="absolute top-1/2 text-lg right-2 transform -translate-y-1/2"
              >
                <IoClose className="text-[#1B2B41]" />
              </button>
            )}
          </div>
          <Button
            className="flex px-[14px] bg-mainBlue box-border items-center font-normal text-lg text-white rounded border border-[#C3D4FF] mt-2 md:mt-0"
            onClick={handleAddUser}
          >
            <AiOutlineUserAdd className="mr-1 text-white text-2xl" />
            Añadir usuario
          </Button>
        </div>
        <TableUsers users={filteredUsers} />
      </CardWhite>
    </div>
  );
};

export default SearchUsers;
