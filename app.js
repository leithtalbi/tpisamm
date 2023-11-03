// const express = require("express")
// const mongoose = require("mongoose")
// const Task = require('./models/task')



// mongoose.connect('mongodb://localhost:27017/task')
// .then(()=>console.log("Connexion a MongoDb réussie !!"))
// .catch((e)=>console.log("Connexion a MongoDb échouée !!",e))

// const app = express()
// app.use(express.json())


// // app.use((res, req, next) =>{ console.log("requete recue")
// // next()
// // })

// // app.use((res,req,next) =>{ res.status(201)
// // next()
// // })

// // app.use((req, res)=>(
// // res.json({message: "Votre requete est ..."})
// // ))

// app.get("/api/tasks/:id",(req,res, next)=>{
//     Task.findOne({_id: req.params.id})
//     .then((task)=>{
//         if(!task){
//             res.status(404).json({
//                 message: "Objet non trouvé"
//             })
//             return
//         }
//         res.status(200).json({
//             model: task,
//             message: "objet trouvé"
//         })
        
//     })
//     .catch((error) =>{
//         res.status(400).json({
//             error: error.message,
//             message: "probléme d'extraction"
//         })
//     })
//     // Task.find()
//     // .then((tasks) => res.status(200).json({
//     //     model : tasks,
//     //     message: "success",
//     // }))
//     // .catch((error) =>{
//     //     res.status(400).json({
//     //         error: error.message,
//     //         message: "probléme d'extraction"
//     //     })
//     // })
//     // const todos = [
//     // {
//     //     _id: "1",
//     //     title: "learn js",
//     //     duration: "30",
//     // },
//     // {
//     //     _id: "2",
//     //     title: "learn Nodejs",
//     //     duration: "40",
//     // },
//     // {
//     //     _id: "3",
//     //     title: "learn React",
//     //     duration: "60",
//     // }
//     // ]
//     // res.status(200).json(todos)
// }
// )
// app.get("/api/tasks/:id",(req,res)=>{
//     console.log(req.params.id)
//     res.send(req.params.id)
// })

// app.post("/api/tasks", (req,res)=>{
//     const task = new Task(req.body)
//     task.save().then(()=>
//     res.status(201).json({
//         model: task,
//         message: "Objet crée !!"
//     }))
//     .catch((error) =>{
//         res.status(400).json({
//             error: error.message,
//             message: "probléme d'extraction"
//         })
//     })
// })


// app.patch("/api/tasks/:id",(req,res)=>{
//   Task.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
//   .then((task)=>{
//     if(!task){
//         res.status(404).json({
//             message: "Objet non trouvé"
//         })
//         return
//     }
//     res.status(200).json({
//         model: task,
//         message: "objet modifié"
//     })
//   }
//   )
// })

// app.delete("/api/tasks/:id",(req,res)=>{
//    Task.deleteOne({_id: req.params.id})
//    .then(()=> res.status(200).json({message:"Objet supprimé"}))
//    .catch((error) => res.satstus(400).json({error}))
// })
// module.exports = app

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const taskRoutes = require("./routes/Task");
const bookRoutes = require("./routes/book");
const UserRoutes = require("./routes/User");
const authorRoutes = require("./routes/author");


mongoose
  .connect("mongodb://localhost:27017/Tasks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à mongoDB... reussite"))
  .catch((e) => console.log("connexion à mongodb échouée", e));

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader(
    "Acces-Control-Allow-Header",
    "Origin, X-Requested-With, Content, Accept, Content-Type ,Authorization"
  );
  res.setHeader(
    "Acces-Control-Allow-Methods",
    "GET, POST, PUT , DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/api/tasks", taskRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/Users", UserRoutes);
app.use("/api/authors",authorRoutes);


module.exports = app;
