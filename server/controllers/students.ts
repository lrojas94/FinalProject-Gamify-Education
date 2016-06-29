import * as express from 'express';
import { Student, Person } from './../models/db';
import { ResponseMessage, QueryStatus } from './../constants';


var router = express.Router();
/**
 * POST: http://localhost:3000/api/students/
 * @param  {[string]} '/'   [Route]
 * @param  {[callback]} (req,res)       [Request and Response Headers]
 * @return {[json]}         [List of all students.]
 */
router.post('/', (req, res) => {
    var result: ResponseMessage = {};

    Student.findAll({
        attributes: ['id', 'username'],
        include: [{
            model: Person,
            as: 'person'
        }]
    })
    .then((users) => {
        result.status = QueryStatus.SUCCESS;
        result.message = 'Successful query.';
        result.data = users;

        res.json(result);
    })
    .catch((err) => {
        console.log(err);
        result.status = QueryStatus.ERROR;
        result.message = 'There was an error querying all the users.';
        result.data = err;
        res.json(result);
    });
});

export default router;
