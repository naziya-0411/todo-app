function loggerMiddleware(req, res, next) {
  try {
    const { body, headers, params, query, originalUrl, baseUrl, host } = req;

    console.log('<--------------Incoming Request----------->');

    console.log({
      body,
      headers,
      params,
      query,
      originalUrl,
      baseUrl,
      host,
      time: new Date().toLocaleTimeString(),
    });

    console.log('<--------------Request ends----------->');

    next();
  } catch (e) {
    next(e);
  }
}

export { loggerMiddleware };
