/**
 * Created by Swapnil on 6/4/2016.
 */

module.exports = function(app){

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.post("/api/user", createUser);

    function createUser(req, res){
        var user = req.body;
        user._id = (new Date()).getTime().toString();
        users.push(user);
        res.json(user);
    }

    function findUserById(req,res){
        id = req.params.userId;
        for (var i in users){
            if (users[i]._id === id){
                res.json(users[i]);
                return;
            }
        }
        res.json({});
    }

    function findUserByCredentials(username, password, res){
        for (var i in users){
            if (users[i].username === username && users[i].password === password){
                res.json(users[i]);
                return;
            }
        }
        res.json({});
    }

    function findUserByUsername(username, res){
        for (var i in users){
            if (users[i].username === username){
                res.json(users[i]);
                return;
            }
        }
        res.json({});
    }

    function getUsers(req, res){
        var username = req.query.username ;
        var password = req.query.password;

        if (username && password){
            findUserByCredentials(username, password, res);
        }else if (username){
            findUserByUsername(username, res);
        }else{
            res.json(users);
        }

    }
};
