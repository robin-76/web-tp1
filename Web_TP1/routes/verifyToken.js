const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    // const token = req.header('auth-token');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTdiZGU0NTQ1YWQ2OGY2NDA1NTk4MjUiLCJpYXQiOjE2MzU1MjIwOTN9.j8xOb4gEzjOmA0QSugtTC60ofMYQD6B5SLoa-wfJwIk';
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}