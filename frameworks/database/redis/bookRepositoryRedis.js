export default function bookRepositoryRedis() {
  return function cachingClient(redisClient) {
    const setCache = ({ key, expireTimeSec, data }) => redisClient.setEx(key, expireTimeSec, data);

    const clearCache = () => redisClient.del("books?page=0&pageSize=5&category=undefined");

    return {
      setCache,
      clearCache
    };
  };
}
