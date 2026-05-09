const path = require("path");
const fractal = require("@frctl/fractal").create();

/* Project Title */
fractal.set("project.title", "Civic-Theme Design Infra");

/* Handlebars Integration */
fractal.components.engine("@frctl/handlebars");
fractal.components.set("ext", ".hbs");

/* Component Configuration */
fractal.components.set("path", path.join(__dirname, "src/components"));
fractal.components.set("default.preview", "@preview");

/* Documentation Configuration */
fractal.docs.set("path", path.join(__dirname, "docs"));

/* Static Assets */
// Fractal will serve your built components and tokens from /dist
fractal.web.set("static.path", path.join(__dirname, "dist"));
fractal.web.set("builder.dest", path.join(__dirname, "build"));

module.exports = fractal;
