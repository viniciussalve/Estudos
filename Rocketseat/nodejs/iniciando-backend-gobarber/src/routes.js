import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ messsage: 'teste' }));

export default routes;
