// We import the express module and the 'CORS' module
import express from 'express';
import cors from 'cors';
import eventsRoute from './routes/events.mjs';

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.get('/', (req, res, next) => res.send({ info: 'Welcome to the events!' }));

app.use('/api/events', eventsRoute);

app.listen(PORT, () => console.log(`server started`));