const Authentiocation = require('./controllers/authentiocation');

module.exports = (app) => {
    app.post('/signup', Authentiocation.signup);    
}