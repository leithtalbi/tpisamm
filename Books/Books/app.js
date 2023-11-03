const express = require("express")
const mongoose = require("mongoose")
const Task = require('./models/book')



mongoose.connect('mongodb://localhost:27017/book')
.then(()=>console.log("Connexion a MongoDb réussie !!"))
.catch((e)=>console.log("Connexion a MongoDb échouée !!",e))

const app = express()
app.use(express.json())




app.get("/api/books/:id",(req,res, next)=>{
    Task.findOne({_id: req.params.id})
    .then((task)=>{
        if(!task){
            res.status(404).json({
                message: "Objet non trouvé"
            })
            return
        }
        res.status(200).json({
            model: task,
            message: "objet trouvé"
        })
        
    })
    .catch((error) =>{
        res.status(400).json({
            error: error.message,
            message: "probléme d'extraction"
        })
    })
    
}
)
app.get("/api/books/:id",(req,res)=>{
    console.log(req.params.id)
    res.send(req.params.id)
})

app.post("/api/books", (req,res)=>{
    const task = new Task(req.body)
    task.save().then(()=>
    res.status(201).json({
        model: task,
        message: "Objet crée !!"
    }))
    .catch((error) =>{
        res.status(400).json({
            error: error.message,
            message: "probléme d'extraction"
        })
    })
})


app.patch("/api/books/:id",(req,res)=>{
  Task.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
  .then((task)=>{
    if(!task){
        res.status(404).json({
            message: "Objet non trouvé"
        })
        return
    }
    res.status(200).json({
        model: task,
        message: "objet modifié"
    })
  }
  )
})

app.delete("/api/books/:id",(req,res)=>{
   Task.deleteOne({_id: req.params.id})
   .then(()=> res.status(200).json({message:"Objet supprimé"}))
   .catch((error) => res.status(400).json({error}))
})
module.exports = app
