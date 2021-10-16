import express, { Router } from 'express';
import cors from 'cors';

const runServer = (() => {
    const app = express(), port = 4000;

    app.use(express.urlencoded({extended: true})).use(cors());

    app.get('/', (req, res) => res.json({message: 'Hello World'}));

    app.listen(port, () => console.log(`http://localhost:${port} started...`));

})();