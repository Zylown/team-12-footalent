import { create } from "zustand";

// Este es el hook que se encarga de manejar el estado de la variable user
export const userStore = create((set) => ({
  user: null, // este es el estado inicial de la variable user
  setUser: (user) => set({ user }), // esta es la función que se encarga de modificar el estado de la variable user
}));
