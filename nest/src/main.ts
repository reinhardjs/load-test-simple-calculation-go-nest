import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    } else {
        const port = process.env.PORT || 4200;
        await app.listen(port);
    }
}
bootstrap()