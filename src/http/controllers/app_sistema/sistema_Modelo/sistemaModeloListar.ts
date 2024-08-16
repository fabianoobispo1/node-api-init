import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

export async function sistemaModeloListar(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/sistema/modelo/listar',{
            
            schema: {
                summary: 'Lista informaçoes.',
                tags: ['Sistema: Modelo'],         
                
                response: {
                    201: z.object({
                        sistemaModelo: z.object({
                            id: z.number()
                            
                        })
                    })
                },
            },
        }, async (request, reply) => {
      
          
            //logica para buscar informacao
            const sistemaModelo =  {id: 1};
  
                
            return reply.status(201).send({sistemaModelo});

        });
}


