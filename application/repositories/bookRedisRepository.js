export default function redisBookRepository(repository) {
  const setCache = (options) => repository.setCache(options);
  const clearCache = () => repository.clearCache();

  return {
    setCache,
    clearCache
  };
}
