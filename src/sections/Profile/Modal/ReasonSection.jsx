import { useState, useEffect, useCallback } from 'react';
import { getAllReasons, deleteReasonById } from '../../../api/reasons/reasons-services';
import CardWhite from '../../../components/CardWhite';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { IoSearch,IoClose } from "react-icons/io5";
import { GoPersonAdd } from "react-icons/go";
import ModalAdd from "./ModalAdd";


const ReasonSection = () => {
  const [reasons, setReasons] = useState([]);
  const [filteredReasons, setFilteredReasons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [deletedReason, setDeletedReason] = useState(false);
  const [reasonToDelete, setReasonToDelete] = useState(null);

  const fetchReasons = useCallback(async () => {
    const response = await getAllReasons();
    if (response && response.data) {
      setReasons(response.data);
      setFilteredReasons(response.data);
    }
  }, []);

  useEffect(() => {
    fetchReasons();
  }, [fetchReasons]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = reasons.filter(reason =>
        reason.description.toLowerCase().includes(value.toLowerCase()) ||
        reason.time.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredReasons(filtered);
    } else {
      setFilteredReasons(reasons);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredReasons(reasons)
  };

  const handleDeletedModal = (reason) => {
    setDeletedReason(true);
    setReasonToDelete(reason);
  };

  const handleAddModal = () => {
    setAddModal(true);
  };

  return (
    <>
      <div className="flex justify-center items-center pt-4  ">
        <CardWhite className="bg-white min-w-[744px] p-[24px] gap-[24px] ">
          <div className="pb-6">
            <h2 className="text-[32px] font-semibold text-[#192739]">
              Motivos de Consulta
            </h2>
          </div>
          <div>
            <div className="flex gap-4">
              <div className="flex-grow relative">
              <Input
                placeholder={"Buscar motivos..."}
                value={searchTerm}
                onChange={handleSearch}
                type="text"
                className="w-full"
              />
              {searchTerm === "" ? (<IoSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent mr-2 text-[#1B2B41]"/>)
              :(<button
                onClick={handleClearSearch}
                className="absolute top-1/2 text-lg right-2 transform -translate-y-1/2"
              >
                <IoClose className="text-[#1B2B41]" />
              </button>)
            }
              
              </div>
              <div className="flex gap-1">
                
                <Button className="flex items-center bg-mainBlue gap-1 border text-white" onClick={handleAddModal}>
                  <GoPersonAdd /> Añadir motivo
                </Button>
              </div>
            </div>
          </div>
          <div className="min-w-[744px] border rounded-md bg-bgTable h-[20rem] overflow-y-auto">
            <table className="w-full ">
              <thead>
                <tr className="pt-[16px]">
                  <td className="p-2 text-center">
                    <h3 className="border rounded-md p-2 bg-custom-gradient">Horario</h3>
                  </td>
                  <td className="w-3/4 text-center">
                    <h3 className="border rounded-md p-2 mr-2 bg-custom-gradient">Descripción</h3>
                  </td>
                </tr>
              </thead>
              <tbody className="space-y-1 rounded-md">
                {filteredReasons.map((reason, index) => (
                  <tr key={index} className="space-x-2">
                    <td className="p-2 text-center w-1/4">
                      <p className="border rounded-md p-2 bg-white">{reason.time} Hs</p>
                    </td>
                    <td className="w-3/4">
                      <div className="flex items-center justify-center ">
                        <p className="w-full p-2 rounded-md border text-center mr-2 bg-white">
                          {reason.description}
                        </p>
                        
                      
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardWhite>
      </div>
      {addModal && <ModalAdd isVisible={addModal} setModalIsVisible={setAddModal} />}
     
    </>
  );
};

export default ReasonSection;