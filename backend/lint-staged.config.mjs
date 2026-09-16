/** @type {import("lint-staged").Configuration} */
const config = {
    "src/**/*.ts": ["eslint --fix", "prettier --write"],

    "*.{js,mjs,cjs,json,yml,yaml,md}": ["prettier --write"],

    "prisma/schema.prisma": ["prettier --write"],
};

export default config;
