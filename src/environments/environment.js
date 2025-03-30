const envConfigFile = `
export const environment = {
  production: false,
  tmdbApiKey: '${process.env.TMDB_API_KEY}',
  tmdbAccessToken: '${process.env.TMDB_ACCESS_TOKEN}',
  apiUrl: 'https://api.themoviedb.org/3'
};
`;