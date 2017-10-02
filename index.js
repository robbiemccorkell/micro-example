const elasticsearch = require('elasticsearch');

const { DATABASE_SERVICE_NAME } = process.env;

module.exports = (req, res) => {
  const client = new elasticsearch.Client({
    host: `${DATABASE_SERVICE_NAME}:9200`,
    log: 'trace',
  });

  client
    .ping({
      requestTimeout: 30000,
    })
    .then(
      function(body) {
        return res.end('Found ES');
      },
      function(error) {
        return res.end("Couldn't find ES");
      },
    );
};
