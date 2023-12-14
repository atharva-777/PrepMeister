import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";


const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{label:'Email',type:'text',placeholder:'Email'},
                password:{label:'Password',placeholder:'Password'},
            },
            async authorize(credentials, req) {
                return null;
            },
        })
    ]
}

export {authOptions};