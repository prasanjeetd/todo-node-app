const task = require("../server/api/controllers/task.controller");
// var request = require("request");
var base_url = "http://localhost:3000/api/v1/task";
var mock = require('mock-require');

const request = require('supertest');
const User = require('../server/api//models/users.model');


describe('Login user', function () {

    let app;

    beforeAll(() => {
        app = require("../server/index");

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

        // spyOn(User, "findOne").and.returnValue(p);
        // done();
    });


    it('login', function (done) {
        request(app)
            .post("/api/v1/login")
            .send({ name: 'meow', password: 'timepass' })
            .auth('username', 'password')
            .set('Accept', 'application/x-www-form-urlencoded')
            // .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                console.log("body", response.body);
                expect(response.body.token).not.toBe('');
            })
            .finally(done);
    });

});

