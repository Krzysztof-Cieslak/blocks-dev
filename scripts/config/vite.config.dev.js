const { searchForWorkspaceRoot } = require("vite");
const react = require("@vitejs/plugin-react");
const paths = require("./paths");

// https://vitejs.dev/config/
const getViteConfigDev = port => ({
  root: paths.blocks + "/src",
  server: {
    middlewareMode: true,
    port,
    hmr: {
      host: "localhost",
    },
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
  resolve: {
    alias: {
      "@user": process.cwd(),
      "@utils": process.cwd() + "/node_modules/@githubnext/blocks/dist",
    },
  },
  optimizeDeps: {
    // what else can we do here?
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "styled-components",
      "hoist-non-react-statics",
      "react-is",
      "lodash.uniqueid",
      "@primer/react",
      "picomatch-browser",
    ],
  },
  build: {
    commonjsOptions: {
      include: /node_modules/,
    },
  },
  plugins: [
    react(),
    {
      name: 'configure-response-headers',
      configureServer: server => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Access-Control-Allow-Private-Network', 'true');
          next();
        });
      }
    }],
});

module.exports = getViteConfigDev;
