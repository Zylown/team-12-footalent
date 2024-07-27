import PropTypes from "prop-types";
import CardWhite from "./CardWhite";
import Button from "./Button";

export default function ModalOk({ isOkVisible, setIsOkVisible, children }) {
  // para manejar este modal se necesita un estado que controle si se muestra o no en su componente padre o sea donde
  // se llame a este componente, en este caso se llama isVisible y la funcion que cambia su estado es setIsVisible
  return (
    isOkVisible && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 sm:p-0 p-2">
        <CardWhite className="sm:min-w-[420px] bg-white gap-6">
          <div>
            <p className="pt-6 pl-4 text-[#192434] text-2xl font-medium">
              {children}
            </p>
          </div>
          <div className="flex justify-end gap-2 px-4 py-3 bg-[#193B67] bg-opacity-5">
            <Button
              className="bg-[#006AF5] text-lg text-white font-semibold"
              onClick={() => setIsOkVisible(false)}
            >
              Aceptar
            </Button>
          </div>
        </CardWhite>
      </div>
    )
  );
}

ModalOk.propTypes = {
  children: PropTypes.node,
  isOkVisible: PropTypes.bool.isRequired,
  setIsOkVisible: PropTypes.func.isRequired,
};
