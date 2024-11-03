import Redis from "redis";

const DEFAULT_TTL = 120;

const redisClient = Redis.createClient();

const getOrSetCache = (key, cb) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (err, data) => {
      if (err) return reject(err);

      if (data) return resolve(JSON.parse(data));

      const newData = await cb();
      redisClient.set(key, DEFAULT_TTL, JSON.stringify(newData));
      return resolve(newData);
    });
  });
};

export { getOrSetCache };
