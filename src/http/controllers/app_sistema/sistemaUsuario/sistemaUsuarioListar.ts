import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

export async function sistemaUsuarioListar(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/sistema/usuario/listar',{
            
            schema: {
                summary: 'Lista usuarios.',
                tags: ['Sistema: Usuarios'],         
                
                response: {
                    201: z.object({
                        faUsuario: z.object({
                            id: z.number()
                            
                        })
                    })
                },
            },
        }, async (request, reply) => {
      
          

            const faUsuario =  {id: 1};
  
                
            return reply.status(201).send({faUsuario});

        });
}


