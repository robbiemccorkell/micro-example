const elasticsearch = require('elasticsearch');

const { ELASTICSEARCH_DATABASE, ELASTICSEARCH_SERVICE_HOST } = process.env;

module.exports = (req, res) => {
  console.log(ELASTICSEARCH_DATABASE);
  console.log(ELASTICSEARCH_SERVICE_HOST);
  const client = new elasticsearch.Client({
    host: `${ELASTICSEARCH_DATABASE}:9200`,
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
