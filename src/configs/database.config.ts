let DB_HOST: string = "localhost";
let DB_PORT: string = "27017";
let DB_DATABASE: string = "ESOnline";

const dbURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

export const dbConnection = {
  url: dbURI,
  options: {
    useUnifiedTopology: true,
    autoIndex: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  },
};
