const client = require('./connection.js');
const query = require('./queries.js');
const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors())

const PORT = 5000

app.get("/api", (req,res)=>{
    query.getAll().then((results)=>{
        console.log(results)

        res.send(results)}).catch((err)=>{
            res.send(err)
        })  
   
})



app.get("/api/staff", (req,res)=>{
    query.getStaff().then((results)=>{
        res.send(results)}).catch((err)=>{
            res.send(err)
        })  
})


app.get("/api/roles", (req,res)=>{
    query.getRoles().then((results) =>{
        res.send(results)
    }).catch((err)=>{
        res.send(err)
    })
})

app.get("/api/clients", (req,res)=>{
    query.getClients().then((results)=>{
        res.send(results)
    }).catch((err)=>{
        res.send(err)
    })
})

app.get("/api/events", (req,res)=>{
    query.getEvents().then((results)=>{
        res.send(results)
    }).catch((err)=>{
        res.send(err)
    })
})




app.get("/api/staff/:id", (req,res)=>{
    let id = req.params.id
    query.getStaffById(id).then((results)=>{
        res.send(results.rows)
    }).catch((err)=>{
        res.send(err)
    })
})

app.post("/api/staff/role", (req, res)=>{
    let {staff_id, first_name, last_name, type_id} = req.body
    query.assignRole({staff_id, first_name, last_name, type_id}).then(
        ()=>{
            res.status(201).send("Assgined role")}
        ).catch((err)=>{res.send(err)})
})


app.delete("/api/staff/role", (req, res)=>{
    let {staff_id, first_name, last_name, type_id} = req.body
    query.removeRole({staff_id, first_name, last_name, type_id}).then(
        ()=>{
            res.send("Removed role")}
        ).catch((err)=>{res.send(err)})
})



app.post("/api/staff", (req, res)=>{
    const {staff_id, first_name, last_name, email, phone} = req.body
    query.addStaff({staff_id, first_name, last_name, email, phone}).then(
        ()=>{
            res.status(201).send("Added staff member")}
        ).catch((err)=>{res.send(err)})
})

app.post("/api/clients",(req, res)=>{
    const {client_id, name, email, phone} = req.body
    query.addClient({client_id, name, email, phone}).then(
        ()=>{
            res.status(201).send("Client created successfully");
    }).catch((err)=>{res.send(err)})
})



app.delete("/api/clients/:id", (req, res)=>{
    let id = req.params.id
    query.deleteClient(id).then(
        ()=>{
            res.send("Successfully deleted client")
        }
    ).catch((err)=>{
        if (err.code === "23503"){
            res.send("Dependent values")
        }
    })
})

app.delete("/api/staff", (req, res)=>{
    let {staff_id, first_name, last_name} = req.body
    query.deleteStaff({staff_id, first_name, last_name}).then(()=>{
        res.send("Successfully deleted staff member")
    }).catch((err)=>{
        res.send(err)
    })

})




app.listen(5000, () =>{
    console.log(`server is now listening on ${PORT}`);
})


client.connect();