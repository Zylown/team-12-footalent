export default function LContact() {
  return (
    <div className="bg-[#DBE5FF]">
      <div className="bg-[#143D72] flex justify-center py-[70px] border-b-2 rounded-tl-[20px] rounded-tr-[20px]">
        <form
          className="card__contact max-w-[544px] w-full flex flex-col rounded-lg pt-12 pb-6 px-6 gap-6"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 158, 220, 0.6) 9%, rgba(1, 73, 227, 0.6))",
          }}
        >
          <h2 className="text-start text-[#E6F7FF] font-medium text-[32px]">
            Contactanos
          </h2>
          <div className="flex flex-col gap-6">
            <div className="flex gap-6 w-full sm:flex-row flex-col">
              <div className="flex flex-col gap-2.5 sm:w-2/4">
                <label className="text-[#E6F7FF] font-semibold text-lg">
                  Nombre
                </label>
                <input
                  className="px-2.5 py-2 rounded border border-[#1C304A] border-opacity-50 outline-none"
                  type="text"
                  placeholder="Ingrese su nombre"
                />
              </div>
              <div className="flex flex-col gap-2.5 sm:w-2/4">
                <label className="text-[#E6F7FF] font-semibold text-lg">
                  Apellido (opcional)
                </label>
                <input
                  className="px-2.5 py-2 rounded border border-[#1C304A] border-opacity-50 outline-none"
                  type="text"
                  placeholder="Ingrese su apellido"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[#E6F7FF] font-semibold text-lg">
                Correo electrónico
              </label>
              <input
                className="px-2.5 py-2 rounded border border-[#1C304A] border-opacity-50 outline-none"
                type="email"
                placeholder="Ingrese su correo electrónico"
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[#E6F7FF] font-semibold text-lg">
                Teléfono
              </label>
              <input
                className="px-2.5 py-2 rounded border border-[#1C304A] border-opacity-50 outline-none"
                type="text"
                placeholder="Ingrese su número de teléfono"
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[#E6F7FF] font-semibold text-lg">
                Mensaje (opcional)
              </label>
              <textarea
                className="px-2.5 py-2 rounded border border-[#1C304A] border-opacity-50 max-h-[82px] h-full outline-none"
                placeholder="Escriba un mensaje..."
                rows="4"
              ></textarea>
            </div>
            <div className="w-full">
              <button
                className="bg-[#006AF5] text-white w-full px-[14px] py-3 rounded text-lg font-medium hover:opacity-70 transition-all"
                type="submit"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
