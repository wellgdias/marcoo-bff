const loadConfig = (configSchema: any, data: any) => {
  const { error, value: envVars } = configSchema.validate(data, { abortEarly: false });
  if (error) {
    throw new Error(`Environment's variable validation error: ${error.message}`);
  }

  return {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    application: {
      name: envVars.APPLICATION_NAME,
      version: envVars.APPLICATION_VERSION,
    },
    services: {
      supermarket: {
        url: envVars.SUPERMARKET_SERVICE,
      },
      product: {
        url: envVars.PRODUCT_SERVICE,
      },
      price: {
        url: envVars.PRICE_SERVICE,
      },
      cep: {
        url: envVars.CEP_SERVICE,
        token: envVars.AUTHORIZATION_TOKEN,
      },
    },
  };
};

export default loadConfig;
