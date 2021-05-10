import { server } from '@infrastructure/server';

server.listen(3333 || process.env.PORT);
