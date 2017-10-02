const elasticsearch = require('elasticsearch');

const { ELASTICSEARCH_DATABASE, ELASTICSEARCH_SERVICE_HOST, ELASTICSEARCH_SERVICE_PORT } = process.env;

module.exports = (req, res) => {
  console.log(ELASTICSEARCH_DATABASE);
  console.log(ELASTICSEARCH_SERVICE_HOST);
  console.log(ELASTICSEARCH_SERVICE_PORT);
  console.log(ELASTICSEARCH_SERVICE_PORT);
  const client = new elasticsearch.Client({
    host: `${ELASTICSEARCH_SERVICE_HOST}:${ELASTICSEARCH_SERVICE_PORT}`,
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
