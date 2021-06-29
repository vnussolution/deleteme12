//https://www.youtube.com/watch?v=mbsmsi7l3r4&ab_channel=WebDevSimplified
//https://www.youtube.com/watch?v=Ud5xKCYQTjM&t=0s&ab_channel=WebDevSimplifiedWebDevSimplifiedVerified
require('dotenv').config();
const express           = require('express');
const app               = express();
const jwt               = require('jsonwebtoken');

app.use(express.json());
const posts = [
    {username:'van',title:'post 11111111111' },
    {username:'neil',title:'post 22222222222'},
    {username:'lou',title:'post 3333333333'},

];

const userDB = [
    {username:'van',password:'cookie1'},
    {username:'neil',password:'cookie2'},
    {username:'lou',password:'cookie3'},
];

app.get('/posts',authenticateToken ,(req,res)=>{

    res.json(posts.filter(post => post.username === req.user.username));
});


app.get('/userdb' ,(req,res)=>{

    res.json(userDB);
});


app.post('/login', (req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

    const checking = userDB.filter(u => u.username === username);

    if(checking.password !== password) return res.sendStatus(401);
    
    const user = {username,password};

    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'145m'});
    
    res.json({accessToken});

});

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null) return res.sendStatus(401);
    
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();    

    })
}


app.listen(3000);