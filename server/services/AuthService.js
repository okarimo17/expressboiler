const {BadRequest,UnAuthorized } = require('../errors')

function AuthService(){

    function login(req,res,userID){
        req.session.userid = userID;
    }


    function logout(req){
        return new Promise((resolve,reject)=>{
            req.session.destroy((err)=>{
              if(err){ reject(err)}
              resolve(true)
            })
        })
    }

    
    
    const isLogged = (req) => {
        return   !!req.session.userid;
    }
    const guest = (req,res,next)=>{
        if(isLogged(req)){
          return next(new UnAuthorized('Already Logged In.'))
        }
        next();
    }
    
    const loggedIn = (req,res,next)=>{
        if(!isLogged(req)){
            return next(new UnAuthorized('You Must Be Logged In.'))
        }
        next()
    }
    

    const redirectDash = (req,res,next)=>{
        if(isLogged(req)){
          return res.redirect('/dashboard');
        } 
        next();
    }
    
    const redirectLogin = (req,res,next)=>{
        if(!isLogged(req)){
            return res.redirect('/clme-login');
        }       
        next()
    }
    

    return {
        login,
        logout,
        isLogged,
        guest,
        loggedIn,
        redirectDash,
        redirectLogin
    }

}




module.exports = AuthService();