const Primus = require("primus");

let go = (server) => {
  let primus = new Primus(server, {});
  primus.on("connection", (spark) => {
    console.log("connected");

    spark.on('data', (data) => {
        console.log(data.data);
        primus.write(data);
        }
    );
  });
};

module.exports.go = go;