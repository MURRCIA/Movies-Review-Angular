const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const targetPath = './src/environments/environment.ts';

const envConfigFile = `
export const environment = {
  production: false,
  tmdbApiKey: '${process.env.TMDB_API_KEY}',
  tmdbAccessToken: '${process.env.TMDB_ACCESS_TOKEN}',
  apiKey: '${process.env.TMDB_API_KEY}', // 
  apiUrl: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p/',
  posterSize: 'w500',
  backdropSize: 'w780'
};
`;

fs.writeFileSync(targetPath, envConfigFile);
console.log(`✅ Archivo generado: ${targetPath}`);
