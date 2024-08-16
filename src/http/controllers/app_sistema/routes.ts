import { FastifyInstance } from 'fastify';
import { faUsuarioRoutes } from './sistemaUsuario/routes';


export async function appSistemaRoutes(app: FastifyInstance) {
    app.register(faUsuarioRoutes);
}