const express = require('express');
const bodyParser = require('body-parser');

var port = process.env.PORT || 3001;
 
// Setup test data
var users = {
    andrew:{
        name:"Andrew Victorio",
        password:"pass",
        type:"user",
        impair:["blind","deaf"],
        phone:"555-500-1010"
    },
    bob: {
        name:"Bob Anderson",
        password:"pass",
        type:"manager",
        location:0,
        phone:"555-555-5555"
    }
}

var locations = [
{
    name:"Bob's Fabric Restaurant",
    manager:users.bob,
    services:["food","restroom"],
    accomodations:["elevator","esclator"]
},{
    name: "Kingsbridge Road Station (4)",
    services:["subway"],
    accomodations:["elevator"]
}
];
    
 
 
// Setup connections
var rest = express();

rest.listen(port);
rest.use(bodyParser.json());
console.log('RESTful API server started on: ' + port);


// Wait for connection and do actions
rest.get("*",(req,res,next) => {
    res.status(400).send('Bad Request');
    
});

// Login handling
rest.post("/login", (req,res,next) => {
    var q = req.body;
    
    if (q.username === undefined || q.password === undefined) {
        res.json({error:true,reason:"Username or password is missing"});
        return;
    }
    
    if (users[q.username.toLowerCase()] == undefined) {
        res.json({error:true,reason:"Username is not registered"});
        return;
    }
    
    var u = users[q.username.toLowerCase()];
    
    if (q.password != u.password) {
        res.json({error:true,reason:"Wrong Password"});
        return;
    }
    
    res.json({error:false,name:u.name,type:u.type});
});

// Registeration handling
rest.post("/register", (req,res,next) => {
    var q = req.body;
    
    var ret = users[q.username] = {
        name:q.name,
        password:q.password,
        type:q.type,
        phone:q.phone
    };
    
    if (q.type != "manager") {
        ret.impair = q.impair;
    }
    
    res.status(204)
});

// Location handling
rest.post("/newlocation", (req,res,next) => {
    var q = req.body;
    
    var ret = {
        name:q.name,
        services:q.services,
        manager:q.manager,
        accomodations:q.accomodations
    };
    
    locations.push(ret);
    
    res.status(204)
});

// Locations
rest.post("/location", (req,res,next) => {
    var q = req.body;
    
    if (Object.keys(q).length === 0 || q.constructor !== Object) {
        res.json(locations);
        return;
    }
    
    if (Number.isInteger(q.id)) {
        res.json(locations[q.id]);
        return;
    }
    
    res.status(400).send('Bad Request');
});
