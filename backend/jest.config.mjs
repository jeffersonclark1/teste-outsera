export default {
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.spec.ts"],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts$": "<rootDir>/tests/typescript-transformer.cjs",
  },
};
