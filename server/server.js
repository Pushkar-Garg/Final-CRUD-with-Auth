import express from "express"
import mysql from "mysql"
import cors from "cors"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const salt = 10;

const app= express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user : "root",
    password: "",
    database: "signup"
})


app.post("/register", (req,res)=>{
    const sql= "INSERT INTO login (`name`,`email`,`password`) VALUES (?)"
    bcrypt.hash(req.body.password.toString(), salt , (err,hash)=>{
        if(err) return res.json({Error: "Error for hassing password"});
        const values= [
            req.body.name,
            req.body.email,
            hash,
        ]
        db.query(sql, [values], (err,result) =>{
            if(err) return res.json({Error: "Inserting Data Error in Server"});
            return res.json({Status: "Success"})
        })
    })
})

app.post("/login", (req, res)=>{
    const sql = "SELECT * FROM login WHERE email = ?"
    db.query(sql, [req.body.email] , (err,data)=>{
        if(err) return res.json({Error: "Login Error in Server"});
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password , (err, response)=>{
                if(err) return res.json({Error: "Password compare error"});
                if(res){

                    const name = data[0].name;
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: "1d" });
                    res.cookie('token', token)
                    return res.json({Status : "Success"});
                }
                else{
                    return res.json({Error: "Wrong Password"});
                }
            })
        }else{
            return res.json({Error: "No email Existed"});
        }

    })
})

app.get('/logout', (req,res)=>{
    res.clearCookie("token")
    return res.json({Status: "Success"})
})

app.get("/user", (req,res)=>{
    const sql = "SELECT * FROM user";
    db.query(sql , (err , data)=>{
        if(err) return res.json("Error");
        return res.json(data)
    })
})

app.post("/create",(req,res)=>{
    const sql = "INSERT INTO user(`Name`,`Email`, `MobileNumber`, `Date`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email,
        req.body.mobileNumber,
        req.body.date
    ]
    db.query(sql, [values] , (err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put("/update/:id",(req,res)=>{
    const sql = "update user set `Name`=? , `Email`= ?, `MobileNumber`= ? ,`Date`= ? where  ID= ?";

    const values = [
        req.body.name,
        req.body.email,
        req.body.mobileNumber,
        req.body.date
    ]
    const id = req.params.id;
    db.query(sql, [...values,id] , (err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})
app.delete("/user/:id",(req,res)=>{
    const sql = "DELETE FROM user where  ID= ?";
    const id = req.params.id;
    db.query(sql, [id] , (err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})


app.listen(8081,()=>{
    console.log("Running server on port 8081");
})
