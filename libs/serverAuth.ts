import { NextApiRequest } from "next";
import { getSession } from 'Next-auth/react';


import  Prisma  from "@/libs/prismadb";


const serverAuth = async (req:NextApiRequest) => {
    const session = await getSession({req});

    if ( !session?.user?.email){
        throw new Error ('NOT SIGNED IN');
    }
    const currentUser = await Prisma.user.findUnique({
        where:{
            email:session.user.email
        }
    });

    if (!currentUser){
        throw new Error('NOT SIGNED IN');
    }
    return {currentUser};
};
export default serverAuth;