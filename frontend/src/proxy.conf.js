const PROXY_API_TARGET = process.env.PROXY_API_TARGET || 'http://localhost:8000';

module.exports = {
  '/api': {
    target: PROXY_API_TARGET,
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
};
