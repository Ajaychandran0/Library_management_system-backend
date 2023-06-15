export default function redisCachingMiddleware(redisClient, key) {
  // eslint-disable-next-line func-names
  return async function (req, res, next) {
    // const params = req.params.id || "";
    const { page, pageSize, category } = req.query;
    const cachedData = await redisClient.get(
      `${key}?page=${page}&pageSize=${pageSize}&category=${category}`
    );
    if (!cachedData) return next();

    return res.json(JSON.parse(cachedData));
  };
}
