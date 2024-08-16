import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

export async function sistemaModeloApagar(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .delete('/sistema/modelo/apagar',{
            
            schema: {
                summary: 'Adiciona informaçoes.',
                tags: ['Sistema: Modelo'],         
                body: z.object({
                    id: z.number(),
            
                }),
                response: {
                    201: z.object({
                        mensagem: z.string(),
                    })
                },
            },
        }, async (request, reply) => {
            
            //recupera informacao do body
            const {
                id
            } = request.body;

            //logica para buscar informacao
                      
                
            return reply.status(201).send({mensagem: 'OK ou não id:'+id});

        });
}


