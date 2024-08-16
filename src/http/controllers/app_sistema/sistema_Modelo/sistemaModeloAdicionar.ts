import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

export async function sistemaModeloAdicionar(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/sistema/modelo/adicionar',{
            
            schema: {
                summary: 'Adiciona informaçoes.',
                tags: ['Sistema: Modelo'],         
                body: z.object({
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
                nome
            } = request.body;
            //logica para buscar informacao
            const sistemaModelo =  {id: 1, nome};
  
                
            return reply.status(201).send({sistemaModelo});

        });
}


