import express from 'express';
import bodyparser from 'body-parser';
import userRoutes from './routes/users.js';

const app = express();
const PORT = 5050;

app.use(bodyparser.json());
app.use('/api', userRoutes);

app.get("/", (req, res) => res.send("Welcome to the Users API!"));

app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT,()=>{
    console.log(`listening on http://localhost:${PORT}/api/all`);
});