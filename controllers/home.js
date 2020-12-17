const { layout } = require('../utils');

const home = (req, res) => {
    res.render('home', {
        locals: {
            title: 'Welcome Page'
        },
        ...layout
    })
};

module.exports = {
    home,
}