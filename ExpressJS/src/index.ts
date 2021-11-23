import express, { Request, Response, Router } from 'express';
import cluster from 'cluster'
import os from 'os';
import cors from 'cors';

const PORT = process.env.PORT || 4000;
const ClusterWorkerSize = os.cpus().length;

if (ClusterWorkerSize > 1) {
    if (cluster.isMaster) { // v16+ deprecated
        for (let i = 0; i < ClusterWorkerSize; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker) => {
            console.log('Worker', worker.id, ' has exitted.');
        })
    } else {
        runServer();
    }
} else {
    runServer(true);
}

function runServer(isSingle = false) {
    const app = express();

    app.use(express.urlencoded({extended: true})).use(cors());

    app.get('/', (req, res) => res.json({message: 'Hello World'}));

    app.get('/test/:second', (req: Request<any>, res: Response) => {
        console.time(req.params.second)
        console.log('test')
        setTimeout(() => {
            console.timeEnd(req.params.second)
            res.json({info: `delay ${req.params.second} second...`});
        }, req.params.second * 1_000);
    });

    app.listen(PORT, () => {
        console.log(`Express server listening on port ${PORT} ${isSingle ? 'with the single worker' : 'and worker'} ${process.pid}.`)
    });
};