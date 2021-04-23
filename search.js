const esClient = require('./esClient');

esClient.ping({}, async (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Elasticsearch is running...');
  }
  
  const index = 'movies';

  const searchBody = {
    query: {
      match_phrase_prefix: {
        "title": "The"
      }
    }
  };
  
  const search = await esClient.search({
    index,
    type: 'movie',
    body: searchBody
  });
  
  const result = search.hits.hits;
  result.forEach(item => {
    console.log(item._source.title);
  });
});