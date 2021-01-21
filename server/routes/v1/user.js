const route = require('express').Router();

module.exports = function(ErrorCatcher,Serives) {
    const {UserService} = Serives;


    route.put('/',ErrorCatcher(async (req,res)=>{
        let user = await UserService.updateUser(req.body);        
        res.json({
            success:true,
            message:"Compte mis à jour avec succès.",
        })
    }))


    return route;
};
