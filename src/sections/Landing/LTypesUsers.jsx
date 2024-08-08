import CardImage1 from "../../assets/Landing/CardImage1.png";
import CardImage2 from "../../assets/Landing/CardImage2.png";
import CardImage3 from "../../assets/Landing/CardImage3.png";
import CardWhite from "../../components/CardWhite";

export default function LTypesUsers() {
  return (
    <div
      className="sm:py-[70px] py-8 sm:px-14 px-6 w-full"
      style={{
        backgroundImage: "linear-gradient(to bottom, #FAFDFF, #DBE5FF)",
      }}
    >
      <div className="w-full flex flex-col sm:gap-6 gap-3 items-center">
        <h2 className="text-[#143D72] text-center sm:font-medium font-semibold sm:text-[40px] text-2xl">
          Nuestros tipos de usuarios
        </h2>
        <div className="flex flex-col sm:gap-[31px] gap-6">
          <CardWhite className="!rounded-3xl bg-white py-8 px-6 sm:max-w-[1128px] max-w-[312px]">
            <div className="flex md:flex-row flex-col">
              <img
                className="w-full h-auto object-contain md:max-w-[300px] max-w-full"
                src={CardImage1}
                alt="Mockup"
              />
              <div className="px-[21px] flex flex-col gap-2.5 justify-center max-w-[566px] w-full">
                <h2 className="font-medium sm:text-[40px] text-xl sm:text-start text-center text-[#005FDB]">
                  Secretario
                </h2>
                <p className="text-[#192739] text-opacity-95 sm:text-2xl text-sm sm:text-start text-center font-normal max-w-[504px] w-full">
                  Es el encargado de agendar turnos, marcar la asistencia de los
                  pacientes, confirmar, reprogramar y cancelarlos según la
                  respuesta que el paciente envía a través del recordatorio
                  automático enviado por el sistema.
                </p>
              </div>
            </div>
          </CardWhite>
          <CardWhite className="!rounded-3xl bg-white py-8 px-6 sm:max-w-[1128px] max-w-[312px]">
            <div className="flex md:flex-row flex-col">
              <div className="px-[21px] flex flex-col gap-2.5 justify-center max-w-[566px] w-full order-1">
                <h2 className="font-medium sm:text-[40px] text-xl sm:text-start text-center text-[#005FDB]">
                  Odontólogo
                </h2>
                <p className="text-[#192739] text-opacity-95 sm:text-2xl text-sm sm:text-start text-center font-normal max-w-[504px] w-full">
                  Tendrá acceso a visualizar su agenda diaria y semanal, en la
                  que además podrá tener seguimiento de los pacientes que
                  atiende.
                </p>
              </div>
              <img
                className="w-full h-auto object-contain md:max-w-[300px] max-w-full"
                src={CardImage2}
                alt="Mockup"
              />
            </div>
          </CardWhite>
          <CardWhite className="!rounded-3xl bg-white py-8 px-6 sm:max-w-[1128px] max-w-[312px]">
            <div className="flex md:flex-row flex-col">
              <img
                className="w-full h-auto object-contain md:max-w-[300px] max-w-full"
                src={CardImage3}
                alt="Mockup"
              />
              <div className="px-[21px] flex flex-col gap-2.5 justify-center max-w-[566px] w-full">
                <h2 className="font-medium sm:text-[40px] text-xl sm:text-start text-center text-[#005FDB]">
                  Administrador
                </h2>
                <p className="text-[#192739] text-opacity-95 sm:text-2xl text-sm sm:text-start text-center font-normal max-w-[504px] w-full">
                  Será quien tenga a cargo el manejo de todo el software,
                  agregando la funcionalidad de Reportes, los cuales le
                  indicarán las métricas del desempeño del centro odontológico
                  en base a los turnos solicitados por los pacientes.
                </p>
              </div>
            </div>
          </CardWhite>
        </div>
      </div>
    </div>
  );
}
