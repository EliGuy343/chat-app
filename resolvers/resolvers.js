import pc from '@prisma/client';
import {ApolloError, AuthenticationError} from 'apollo-server';
import bcrypt from 'bcryptjs';

const prisma = new pc.PrismaClient();
const resolvers = {
    Query:{
    },
    Mutation:{
        signupUser: async (_,{newUser})=> {
            const user = await prisma.user.findUnique({
                where:{email:newUser.email}
            });
            if(user)
                throw new AuthenticationError('User already exists'); 
            const hashedPassword = await bcrypt.hash(newUser.password, 10);
            const CreatedUser = await prisma.user.create({
                data:{
                    ...newUser,
                    password:hashedPassword
                }  
            });
            return CreatedUser;
        }
    }
};

export default resolvers;