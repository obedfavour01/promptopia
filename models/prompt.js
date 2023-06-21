import mongoose,{model,Schema,models} from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt:{
        type:String,
        required: [true, 'Prompt is required.'],

    },
    tag:{
        type : String,
        required: [true,"Tag is required"],

    }
});


const Prompt = models.Prompt || model('Prompt',PromptSchema)
// Either get the prompt that already exixt in the model's object or if it doesnt exist create a new model called Prompt 
// based on the model  PromptSchema
 
export default Prompt;