import { jwtDecode } from "jwt-decode";

// default function es una función que se exporta por defecto y que puede tener cualquier nombre al ser importada
export function useDecode(token) {
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (e) {
      console.error("Error decoding token", e);
    }
  }
  return null;
}
