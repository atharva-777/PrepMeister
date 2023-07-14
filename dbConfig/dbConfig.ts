import mongoose from "mongoose";


export async function connect () {
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('Connected to MongoDB successfully');
        })
        connection.on('error',()=>{
            process.exit(0);
        })
    }
    catch(error){
        console.log('Something went wrong');
        console.log(error);
    }
}