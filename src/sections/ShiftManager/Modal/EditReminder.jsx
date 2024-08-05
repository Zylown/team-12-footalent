import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button';
import CardWhite from '../../../components/CardWhite';
import ModalOk from '../../../components/ModalOk';
import TimeInput from '../../../components/TimeInput';
import ModalCancel from '../../../components/ModalCancel';
import { FaBold, FaUnderline, FaItalic, FaImage } from 'react-icons/fa';

const EditReminder = ({ isVisible, setModalIsVisible }) => {
  //estado para el texto
  const [text, setText] = useState('');
  // Estado para la anticipación
  const [anticipation, setAnticipation] = useState(null); 
  //estado para el modal de ok
  const [modalOk, setModalOk] = useState(false);
  //estados para los estilos que cambian con los botones
  const [textStyle, setTextStyle] = useState({ fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none' });
  //estado para el modal de cancelar
  const [modalCancelIsVisible, setModalCancelIsVisible] = useState(false);

  useEffect(() => {
    // Simulando la carga de datos desde la base de datos
    setText(generateReminderMessage("Marcelo", "01/08/2024", anticipation));
  }, [anticipation]);

  const applyStyle = (style) => {
    switch(style) {
      case 'bold':
        setTextStyle(prev => ({ ...prev, fontWeight: prev.fontWeight === 'bold' ? 'normal' : 'bold' }));
        break;
      case 'italic':
        setTextStyle(prev => ({ ...prev, fontStyle: prev.fontStyle === 'italic' ? 'normal' : 'italic' }));
        break;
      case 'underline':
        setTextStyle(prev => ({ ...prev, textDecoration: prev.textDecoration === 'underline' ? 'none' : 'underline' }));
        break;
      default:
        break;
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAnticipationChange = (value) => {
    if (value === "") {
      setAnticipation(null);
    } else {
      const minutes = parseInt(value, 10);
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      setAnticipation(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`);
    }
  };
  const handleOnClose = () => {
    setModalIsVisible(false);
  };
  const handleCancel = () => {
    setModalCancelIsVisible(true);
  };

  const handleSave = () => {
    // Aquí puedes hacer la lógica para guardar los cambios en la base de datos
    console.log(text);
    console.log(anticipation);

    setModalOk(true);
  };

  //genero el texto
  const generateReminderMessage = (name, date, time) => {
    return `¡Hola, ${name}!\nTe recordamos que tenés un turno programado en nuestro consultorio odontológico:\nFecha: ${date}\nHora: ${time}\n\nPor favor, confirmá tu asistencia.\n\n¡Gracias por tu colaboración!\nSi necesitas reprogramar tu cita, no dudes en contactarnos.\n\n¡Que tengas un excelente día!,\nDentalPlanner`;
  };

  return (
    isVisible && (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <CardWhite className="w-[568px] bg-white">
            <div className="space-y-1">
              {/* Sección de botones para modificar texto */}
              <div className="flex justify-between items-baseline p-[10px] bg-bgGrey">
                <div className="flex gap-1">
                  <Button onClick={() => applyStyle('bold')}><FaBold /></Button>
                  <Button onClick={() => applyStyle('italic')}><FaItalic /></Button>
                  <Button onClick={() => applyStyle('underline')}><FaUnderline /></Button>
                  <Button><FaImage /></Button>
                </div>
                <h2 className="text-[24px] font-semibold text-textGrey mb-1">Recordatorio</h2>
              </div>
              {/* Campo de texto predefinido */}
              <div className='px-[10px]'>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                 
                </label>
                <div className=" p-2">
                  <textarea
                    id="text"
                    value={text}
                    onChange={handleTextChange}
                    style={textStyle}
                    className="w-full h-[21rem] text-[#616D7C] resize-none"
                  />
                </div>
              </div>

              {/* Botón de seleccionar anticipación */}
              <div className='p-[10px]  border-t bg-[#FAFDFF]'>
                <label htmlFor="anticipation" className="block text-sm font-medium pb-1 text-gray-700">
                  Anticipación
                </label>
                <TimeInput
                  maxTime={2880} // Máximo tiempo en minutos (48 horas)
                  interval={240} // Intervalo en minutos (4 hora)
                  onChange={handleAnticipationChange}
                  className="max-w-[250px]" // Clase personalizada para el ancho máximo
                />
               
              </div>

              {/* Botones de cancelar y guardar */}
              <div className="flex gap-2 p-[10px] bg-bgGrey justify-end">
                <Button onClick={handleCancel} className=" text-mainBlue">Cancelar</Button>
                <Button onClick={handleSave} className="bg-mainBlue text-white">Guardar</Button>
              </div>
            </div>
          </CardWhite>
        </div>
        {modalOk && (
          <ModalOk isOkVisible={modalOk} setIsOkVisible={setModalOk}>
            Cambios guardados con éxito
          </ModalOk>
        )}
        <ModalCancel
          isVisible={modalCancelIsVisible}
          setIsVisible={setModalCancelIsVisible}
          cancelModal={handleOnClose}
        />
      </>
    )
  );
};

export default EditReminder;
