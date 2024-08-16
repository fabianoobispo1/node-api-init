import { FastifyInstance } from 'fastify';

import { sistemaModeloListar } from './sistemaModeloListar';
import { sistemaModeloAdicionar } from './sistemaModeloAdicionar';
import { sistemaModeloEditar } from './sistemaModeloEditar';
import { sistemaModeloApagar } from './sistemaModeloApagar';

export async function sistemaModeloRoutes(app: FastifyInstance) {   
    app.register(sistemaModeloAdicionar);
    app.register(sistemaModeloListar);
    app.register(sistemaModeloEditar);
    app.register(sistemaModeloApagar);
}