export default {
  source: ["src/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "dist/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
        },
      ],
    },
    ts: {
      transformGroup: "js",
      buildPath: "dist/",
      files: [
        {
          destination: "tokens.ts",
          format: "javascript/es6",
        },
      ],
    },
  },
};
