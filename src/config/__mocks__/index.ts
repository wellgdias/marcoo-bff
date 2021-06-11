const config = () => ({
  env: 'test',
  port: 8082,
  application: {
    name: 'envVars.APPLICATION_NAME',
    version: 'envVars.APPLICATION_VERSION',
  },
  services: {
    supermarket: {
      url: 'envVars.SUPERMARKET_SERVICE',
    },
    product: {
      url: 'envVars.PRODUCT_SERVICE',
    },
    price: {
      url: 'envVars.PRICE_SERVICE',
    },
    cep: {
      url: 'envVars.CEP_SERVICE',
      token: 'envVars.AUTHORIZATION_TOKEN',
    },
  },
});

export default config;
