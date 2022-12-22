import 'dotenv/config';
import express from 'express';
const app = express();
const port = 3000;
import UserController from './app/controllers/UserController';
import Queues from './app/lib/Queue';
const { ExpressAdapter,
        createBullBoard,
        BullAdapter } = require('@bull-board/express');


const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { queues } = Queues;

createBullBoard({
    // queues: [new BullAdapter(Queues.queues[0].bull)],
    queues: queues.map((job) => new BullAdapter(job.bull)),
    serverAdapter: serverAdapter,
});


app.use('/admin/queues', serverAdapter.getRouter());

app.use(express.json());

app.post("/user", UserController.store);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})