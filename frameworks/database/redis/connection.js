export default function connection(redis) {
  const createRedisClient = function createRedisClient() {
    const client = (0, redis.createClient)();
    client.on("error", (err) => console.log("Redis Client Error", err));
    client
      .connect()
      .then(() => {
        console.log("Redis connected successfully");
      })
      .catch((err) => {
        console.log(err);
      });
    return client;
  };
  return {
    createRedisClient
  };
}
