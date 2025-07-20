import { CustomCard } from "types/config/custom-card";

// Ensure this file is treated as a module
export {};

// Add global type declarations
declare global {
  interface Window {
    customCards: Array<CustomCard>;
  }
}
