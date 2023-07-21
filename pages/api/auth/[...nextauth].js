import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import api from '../../../libs/user';

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: 'credentials',
            credentials:{
                user: { label: 'User', type: 'text'},
                password: { label: 'Senha', type: 'password'}
            },
            authorize: async (credentials, req) => {
                if(credentials && credentials.user && credentials.password){
                    const user = await api.getUserLogin(credentials.user, credentials.password);
                    if(user){
                        return {
                            id: user.id,
                            user: user.user,
                            senha: user.senha,
                            cargo: user.cargo,
                            clienteId: user.clienteId
                        };
                    }
                }
                return null;
            }
        })
    ],
    callbacks: {
        jwt: async ( {token, user} ) => {
            if(user){
                token.user = user;
            }
            return token;
        },
        session: async ({ session, token}) => {
            if(token){
                session.user = token.user;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login'
    }
}

export default NextAuth(authOptions);