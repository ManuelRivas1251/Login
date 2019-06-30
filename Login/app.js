const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get("/url", (req, res, next) => {
 res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});


app.get('/GetUser', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'Virtualizacion1.',
        server: 'database-1.calagsqqt5ca.us-east-1.rds.amazonaws.com', 
        database: 'Virtualizacion' 
    };

    // connect to your database
    
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        var PasswordHeader = req.header('Password');
        var EmailHeader = req.header('Email');
        
        // query to the database and get the records
        var query = 'select Email,Password from USERS where Email = \''+EmailHeader+ '\' AND Password = \''+PasswordHeader+'\'; ';
        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)
            // send records as a response
            if (recordset.recordset.length > 0) {
                res.send("Si");   
            }else{

                res.send("No");
            }
            sql.close();
        });
    });
});

app.post('/PostUser', function (req, res) {
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'Virtualizacion1.',
        server: 'database-1.calagsqqt5ca.us-east-1.rds.amazonaws.com', 
        database: 'Virtualizacion' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        var PasswordHeader = req.header('Password');
        var EmailHeader = req.header('Email');
        var Nombre = req.header('Nombre');
        var Apellido = req.header('Apellido');
        var FechaNacimiento = req.header('FechaNacimiento');
        // query to the database and get the records
        var query = 'INSERT INTO USERS(Email,Nombre,Apellido,Password,FechaNacimiento) VALUES (\''+EmailHeader+'\',\''+
        Nombre+'\',\''+Apellido+'\',\''+PasswordHeader+'\',\''+FechaNacimiento+'\');';

        request.query(query, function (err, recordset) {
            if (err){
                res.send(err);
            }    else  {
                res.send("Registro exitosamente");
            }                      
            sql.close();    
        });
        
    });
});
