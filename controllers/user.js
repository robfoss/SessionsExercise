const bcrypt = require('bcryptjs');
const { layout } = require('../utils');
const { Users } = require('../models');

const newUser = (req, res) => {
    res.render('login', {
        locals: {
            title: 'Sign Up'
        },
        ...layout
    })
}

const processNewUser = async(req, res) =>{
    const { username, password } = req.body;
    if(username === '' || password === ''){
        console.log('Username or Password is blank');
        res.redirect('/new')
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        try {
            const newUser = await Users.create({
                username,
                hash
            });
            res.redirect('/login');
        }
        catch(err){
            console.log(err)
            if (err.name === "SequelizeUniqueConstraintError" ){
                console.log('Username is Taken');
            }
            res.redirect('/new');
        }
    }
};


module.exports = {
    newUser,
    processNewUser,
}