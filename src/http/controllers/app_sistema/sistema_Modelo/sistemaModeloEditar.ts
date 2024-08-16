import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

export async function sistemaModeloEditar(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/sistema/modelo/editar',{
            
            schema: {
                summary: 'Edita informaçoes.',
                tags: ['Sistema: Modelo'],         
                body: z.object({
                    id: z.number(),
                    nome: z.string(),
            
                }),
                response: {
                    201: z.object({
                        sistemaModelo: z.object({
                            id: z.number(),
                            nome: z.string()
                            
                        })
                    })
                },
            },
        }, async (request, reply) => {
            
            //recupera informacao do body
            const {
                id,
                nome
            } = request.body;
            //logica para buscar informacao e editar
            const sistemaModelo =  {id: id, nome};
  
                
            return reply.status(201).send({sistemaModelo});

        });
}


