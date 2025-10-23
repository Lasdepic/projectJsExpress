import mongoose from "mongoose";
const uri = "mongodb+srv://admin:admin@nomserveur.docnopt.mongodb.net/pilotef1?retryWrites=true&w=majority&appName=nomServeur";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export async function connectDB() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(error){
    console.log(error);
  }
}

export default mongoose;
