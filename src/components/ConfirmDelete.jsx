import PropTypes from "prop-types";
import { Button } from "antd";
import CardWhite from "./CardWhite";

export default function ConfirmDelete({
  showModal,
  setShowModal,
  cancelModal,
  handleConfirmDelete,
  loadingDelete,
}) {
  const handleCancel = () => {
    setShowModal(false);
    cancelModal();
  };

  const handleDelete = () => {
    setShowModal(false);
    handleConfirmDelete();
  };

  return (
    showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black bg-opacity-50 sm:p-0">
        <CardWhite className="sm:min-w-[420px] bg-white gap-6">
          <div>
            <h2 className="pl-4 pt-6 pr-2.5 text-2xl font-medium text-[#192434]">
              Eliminar turno
            </h2>
            <p className="px-4 py-2.5 text-[#1B2B41] text-opacity-70 text-lg font-normal">
              El paciente podría no volver a tener el turno en este horario.
              <br />
              ¿Estás seguro de eliminar el turno?
            </p>
          </div>
          <div className="flex justify-end gap-2 px-4 py-3 bg-[#193B67] bg-opacity-5">
            <Button
              className="text-[#006AF5] font-normal px-4 py-3 h-10 text-base rounded bg-transparent font-sans border-none shadow-none"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              className="h-10 px-4 py-3 text-lg font-semibold rounded"
              onClick={handleDelete}
              danger
              loading={loadingDelete}
              type="primary"
            >
              Eliminar
            </Button>
          </div>
        </CardWhite>
      </div>
    )
  );
}

ConfirmDelete.propTypes = {
  loadingDelete: PropTypes.bool,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  cancelModal: PropTypes.func.isRequired,
  handleConfirmDelete: PropTypes.func.isRequired,
};

