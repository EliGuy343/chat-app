import pc from '@prisma/client';
import {
    ApolloError,
    AuthenticationError, 
    ForbiddenError
} from 'apollo-server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new pc.PrismaClient();
const resolvers = {
    Query:{
        users: async (_,args,{userId})=>{
            if(!userId)
                ForbiddenError('You must be logged in to fetch users');
                
            const users = await prisma.user.findMany({
                where:{
                    id:{
                        not:userId
                    }
                }
            });
            return users;
        }
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
        },
        signinUser: async (_,{userSignin}) => {
            const user = await prisma.user.findUnique({
                where:{email:userSignin.email}
            });
            if(!user)
                throw new AuthenticationError('User Doesn\'t Exist');
            const passwordMatch = bcrypt.compare(
                userSignin.password, user.password);
            if(!passwordMatch)
                throw new AuthenticationError('Password is invalid');

            const token = jwt.sign({userId:user.id},process.env.JWT);
            return {token};
        },
        createMessage: async (_,{receiverId, text},{userId})=>{
            if(!userId)
                throw new ForbiddenError('You are not logged in');
            const message = await prisma.message.create({
                data:{
                    text:text,
                    receiverId: receiverId,
                    senderId:userId
                }
            });
            return message;
        }
    }
};

export default resolvers;