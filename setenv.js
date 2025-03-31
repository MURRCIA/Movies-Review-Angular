const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const targetPath = './src/environments/environment.ts';

if (!process.env.TMDB_API_KEY || !process.env.TMDB_ACCESS_TOKEN) {
  console.error('❌ ERROR: Variables de entorno faltantes en .env');
  process.exit(1);
}

const envConfigFile = `
export const environment = {
  production: false,
  tmdbApiKey: '${process.env.TMDB_API_KEY}',
  tmdbAccessToken: '${process.env.TMDB_ACCESS_TOKEN}',
  apiKey: '${process.env.TMDB_API_KEY}', // aún puede ser útil para otras llamadas si querés
  apiUrl: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p/',
  posterSize: 'w500',
  backdropSize: 'w780'
};
`;

fs.writeFileSync(targetPath, envConfigFile.trimStart());
console.log(`✅ Archivo generado: ${targetPath}`);
