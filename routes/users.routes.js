const user = require('../controllers/user.controller.js');

module.exports = (app) => {
    app.post('/user/', user.signup);
    app.post('/user/login/', user.login);
    app.get('/user/users', user.users);
}