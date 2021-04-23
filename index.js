const data = require('./data.json');
const esClient = require('./esClient');

esClient.ping({}, async (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Elasticsearch is running...');

    const index = 'movies';

    await esClient.indices.create({
      index
    });

    const mapping = {
      properties: {
        title: {
          type: 'text'
        },
        rank: {
          type: 'integer'
        }
      }
    };

    await esClient.indices.putMapping({
      index,
      type: 'movie',
      body: mapping,
      includeTypeName: true
    });

    data.forEach(async (item, key) => {
      await esClient.index({
        index,
        type: 'movie',
        id: key + 1,
        body: item
      })
    });
  }
});