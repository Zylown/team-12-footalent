import PropTypes from "prop-types";
import Button from "./Button";
import CardWhite from "./CardWhite";

export default function ModalCancel({ isVisible, setIsVisible, cancelModal }) {
  const handleBack = () => {
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
    cancelModal();
  };

  return (
    isVisible && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 sm:p-0 p-2">
        <CardWhite className="sm:min-w-[420px] bg-white gap-6">
          <div>
            <h2 className="pl-4 pt-6 pr-2.5 text-2xl font-medium text-[#192434]">
              ¿Estás seguro de cancelar?
            </h2>
            <p className="px-4 py-2.5 text-[#1B2B41] text-opacity-70 text-lg font-normal">
              Se perderán todos los cambios que hayas
              <br />
              realizado.
            </p>
          </div>
          <div className="flex justify-end gap-2 px-4 py-3 bg-[#193B67] bg-opacity-5">
            <Button className="text-[#005FDB] text-lg" onClick={handleBack}>
              Volver
            </Button>
            <Button
              className="bg-[#006AF5] text-lg text-white font-semibold"
              onClick={handleCancel}
            >
              Aceptar
            </Button>
          </div>
        </CardWhite>
      </div>
    )
  );
}

ModalCancel.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  cancelModal: PropTypes.func.isRequired,
};
