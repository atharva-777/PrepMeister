import mongoose from "mongoose";

const questionScheme = new mongoose.Schema({
    title:{
        type: 'string',
        required: true,
    },
    number:{
        type: 'number',
        required: true,
    },
    description: {
        type: 'string',
        required: true,
    },
    tags : {
        type: 'array',
    },
    company : {
        type: 'array',
    },
    level : {
        type: 'string',
        required: true,
    }
})

const Question = mongoose.models.questions || mongoose.model("questions", questionScheme);

export default Question