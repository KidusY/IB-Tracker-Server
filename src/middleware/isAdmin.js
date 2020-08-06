const loginService = require('../login/login-service');

function isAdmin(req, res, next) {
    console.log(req.user);
	if(req.user.isadmin){
        next();
    }
    else{
        return res.status(401).json({ error: 'Admin Access Only' });
    }
}

module.exports = {
	isAdmin
};