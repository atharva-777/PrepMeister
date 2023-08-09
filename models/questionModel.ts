import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema({
  input: {
    type: Array,
  },
  output: {
    type: Array,
  },
  explaination: {
    type: Array,
  },
});

const questionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    number:{
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags : {
        type: Array,
    },
    company : {
        type: Array,
    },
    level : {
        type: String,
        required: true,
    },
    slug : {
        type: String,
        unique: true,
        slug: "title",
    },
    examples: {
        type: [exampleSchema],
        required: true,
    }
})



// questionSchema.pre('save',function(){
//     this.slug = slugify(this.title,{lower:true});
// })


const Question = mongoose.models.questions || mongoose.model("questions", questionSchema);

export default Question