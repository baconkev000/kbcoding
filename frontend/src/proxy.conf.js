const PROXY_API_TARGET = process.env.PROXY_API_TARGET || 'http://localhost:8000';

function isGameAssetPath(url) {
  return /^\/projects\/\d+\/game(\/|$)/.test(url);
}

module.exports = {
  '/api': {
    target: PROXY_API_TARGET,
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/media': {
    target: PROXY_API_TARGET,
    secure: false,
    changeOrigin: true,
  },
  '/projects': {
    target: PROXY_API_TARGET,
    secure: false,
    changeOrigin: true,
    bypass: (req) => {
      if (isGameAssetPath(req.url)) {
        return null;
      }
      return req.url;
    },
  },
};
