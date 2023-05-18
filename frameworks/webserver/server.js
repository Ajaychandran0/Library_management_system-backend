export default function serverConfig(server) {
  function startServer() {
    server.listen(process.env.SERVER_PORT, () => {
      console.log(`Server connected on port: ${process.env.SERVER_PORT}`);
    });
  }

  return {
    startServer
  };
}
