import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
//import { prisma } from '@/lib/prisma';
import { BadRequest } from '../../../_errors/bad-request';
import { verifySistemaJwt } from '@/http/middlewares/verifySistema-jwt';
import { getUserById } from '@/lib/database';


export async function sistemaPerfilusuarioLogado(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/sistema/usuario/perfil',{
            onRequest: [verifySistemaJwt],
            schema: {
                summary: 'Perfil do usuario logado.',
                tags: ['Sistema: Usuarios'],      
                
                response: {
                    201: z.object({
                        sistemaUsuario: z.object({                        
                            id: z.string().uuid() ,
                            nome: z.string(),
                            email: z.string().email(), 
                            administrador: z.boolean(),
                            data_nascimento: z.string(),
                            created_at:  z.string(),
                        })
                    })
                },
            },
        }, async (request, reply) => {
      
            const id = request.user.sub;

            /* const faUsuario = await prisma.faUsuario.findUnique({
                where: {
                    id
                }
            }); */
        
            const sistemaUsuario = await getUserById(id);
            if (!sistemaUsuario) {
                throw new BadRequest('Usuário não encontrado.');
            }
  
                
            return reply.status(201).send({sistemaUsuario});

        });
}


