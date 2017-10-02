const elasticsearch = require('elasticsearch');

const { DATABASE_SERVICE_NAME, ELASTICSEARCH_SERVICE_HOST, ELASTICSEARCH_SERVICE_PORT } = process.env;

module.exports = (req, res) => {
  console.log(DATABASE_SERVICE_NAME);
  console.log(ELASTICSEARCH_SERVICE_HOST);
  console.log(ELASTICSEARCH_SERVICE_PORT);
  const client = new elasticsearch.Client({
    host: `172.30.187.124:${ELASTICSEARCH_SERVICE_PORT}`,
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
