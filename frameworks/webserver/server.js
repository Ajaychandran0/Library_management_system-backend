export default function serverConfig(server, config) {
  function startServer() {
    server.listen(config.port, () => {
      console.log(`Server connected on port: ${config.port}`);
    });
  }

  return {
    startServer
  };
}
