const task = require("../server/api/controllers/task.controller");
// var request = require("request");
var getTaskUrl = "/api/v1/task";
var mock = require('mock-require');

const request = require('supertest');

const app = require("../server/index");
const authValidator = require('../server/api/utils');


function spyOnModule(modulePath, exportSymbolName) {
    const spy = jasmine.createSpy(`Spy of ${modulePath}#${exportSymbolName}`);
    spyOn(authValidator, exportSymbolName).and.returnValue(spy);
    return spy;
}

describe('GET /task', function () {

    beforeAll(() => {

        /*  mock('../server/api//models/users.model', {
             findOne: function () {
                 return new User({ password: "timepass1" });
             }
         });
 
         mock.reRequire('../server/api/controllers/task.controller'); */
        /* 
                jest.mock('../server/api//models/users.model', () => () => (
                    new User({ password: "timepass1" })
                )); */

        /* const p = new Promise((resolve, reject) => {
            var u = new User({ password: "timepass1" });
            resolve(u);
        }); */


        // done();
    });


    beforeEach(function () {
        /* spyOn(authValidator, "validateToken").and.returnValue(
            (req, res, next) => {
                console.log("billa meow");
                next();
            }); */

        /* spyOnModule("'../server/api/utils'", "validateToken").and.returnValue(
            (req, res, next) => {
                console.log("billa meow");
                next();
            }); */

        /*   jasmine.createSpy('validateToken', authValidator).and.returnValue(
              (req, res, next) => {
                  console.log("billa meow");
                  next();
              }); */

        mock('../server/api/utils',
            {
                validateToken: function (req, res, next) {
                  next();
                }
            });

    });

    it('get all', function (done) {

        request(app)
            .get(getTaskUrl)
            // .send({ name: 'meow', password: 'timepass' })
            // .auth('username', 'password')
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200, done)
            .then(response => {
                console.log("get task body", response.body);
                expect(response.body).not.toBe('');
            })
        // .finally(done);
    });

    

});
