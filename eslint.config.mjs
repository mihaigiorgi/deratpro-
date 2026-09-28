import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    /*
     * Scena Three.js folosește modelul recomandat de React Three Fiber: obiectele 3D,
     * uniform-urile și buffer-ele de particule sunt create o singură dată și apoi
     * modificate direct în useFrame (bucla de animație, ~60 de cadre/secundă), în afara
     * randării React. Regula `immutability` a React Compiler nu modelează această buclă
     * imperativă, așa că o dezactivăm DOAR pentru folderul three/, nu în tot proiectul.
     */
    files: ["src/components/three/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/immutability": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
