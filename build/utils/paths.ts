import { resolve } from "path";

// root
export const root = resolve(__dirname, "..", "..");
export const compRoot = resolve(root, "packages");

// output
export const output = resolve(root, "dist");
export const outputEsm = resolve(root, "dist/es");
export const outputCjs = resolve(root, "dist/lib");

// package
export const compPackage = resolve(root, "package.json");
