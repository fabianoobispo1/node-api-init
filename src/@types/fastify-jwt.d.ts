import '@fastify/jwt';

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string;
      administrador?: boolean;
      role?: 'ADMIN' | 'MEMBER';
      sign: {
        sub: string;
      };
    };
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    sistemaVerify<Decoded extends fastifyJwt.VerifyPayloadType>(
      options?: fastifyJwt.FastifyJwtVerifyOptions
    ): Promise<Decoded>;
  }

  interface FastifyReply {
    sistemaSign(
      payload: fastifyJwt.SignPayloadType,
      options?: fastifyJwt.FastifyJwtSignOptions
    ): Promise<string>;
  }
}
