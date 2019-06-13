const PersonsController = require('./controllers/persons.controller');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

exports.routesConfig = function (app) {
// routes for the app

    app.post('/persons/add/', [
	ValidationMiddleware.validJWTNeeded,
	PersonsController.addPerson
    ]);
    app.post('/persons/search/', [
	ValidationMiddleware.validJWTNeeded,
	PersonsController.searchPerson
    ]);
    app.get('/persons/list/', [
	ValidationMiddleware.validJWTNeeded,
	PersonsController.listPersons
    ]);
    app.patch('/persons/edit/:id', [
	ValidationMiddleware.validJWTNeeded,
	PersonsController.editPerson
    ]);
    app.delete('/persons/delete/:id', [
	ValidationMiddleware.validJWTNeeded,
	PersonsController.deletePerson
    ]);
};