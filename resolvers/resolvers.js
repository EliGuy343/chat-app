import pc from '@prisma/client';
import {
    AuthenticationError, 
    ForbiddenError
} from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
const prisma = new pc.PrismaClient();
const MESSAGE_ADDED = 'MESSAGE_ADDED';

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
        },
        messagesByUser: async (_,{receiverId},{userId}) =>{
            if(!userId)
                ForbiddenError('You must be logged in to fetch users');
            const messages = await prisma.message.findMany({
                where:{
                    OR:[
                        {
                            senderId:userId,
                            receiverId:receiverId
                        },
                        {
                           receiverId:userId,
                           senderId:receiverId 
                        }
                    ]
                },
                orderBy:{
                    createdAt:"asc"
                }
            });
            return messages;
        },
        user: async (_,{receiverId},{userId})=>{
            if(!userId)
                ForbiddenError('You must be logged in to fetch users');
                
            const user = await prisma.user.findFirst({
                where:{
                    id:receiverId
                }
            });
            return user;
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
            pubSub.publish(MESSAGE_ADDED,{messageAdded:message})
            return message;
        }
    },
    Subscription:{
        messageAdded:{
            subscribe:()=>pubSub.asyncIterator(MESSAGE_ADDED)
        }
    }
};

export default resolvers;