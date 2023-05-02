export default function connection(mongoose, config) {
  function connectToMongo() {
    mongoose
      .connect(config.mongo.uri)
      .then(
        () => {},
        (err) => {
          console.info("Mongodb error", err);
        },
      )
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  mongoose.connection.on("connected", () => {
    console.info("Connected to MongoDB!");
  });

  mongoose.connection.on("error", (error) => {
    console.error(`Error in MongoDb connection: ${error}`);
    mongoose.disconnect();
  });

  return {
    connectToMongo,
  };
}
