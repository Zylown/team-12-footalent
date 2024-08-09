import { create } from "zustand";

export const clinicalStore = create((set) => ({
  clinics: [],
  isLoading: true,
  modalEditVisible: false,
  valueData: { id: 1, data: "", description: "" },

  setClinics: (clinics) => set({ clinics }),
  setIsLoading: (isLoading) => set({ isLoading }),
  openModal: (valueData) => set({ modalEditVisible: true, valueData }),
  closeModal: () =>
    set({
      modalEditVisible: false,
      valueData: { id: 1, data: "", description: "" },
    }),
  updateClinic: (updatedClinic) =>
    set((state) => ({
      clinics: state.clinics.map(
        (clinic) =>
          clinic.data === updatedClinic.data
            ? { ...clinic, description: updatedClinic.description } // solo actualiza si el dato es igual al que se quiere actualizar
            : clinic // si no es igual, regresa el mismo objeto
      ),
    })),
}));
