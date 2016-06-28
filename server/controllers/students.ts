import * as express from 'express';
import * as db from './../models/db';
import { ResponseMessage, QueryStatus } from './../constants';

const studentDB = db.Student;

var router = express.Router();

router.post('/', (req, res) => {
    var result: ResponseMessage = {};

    studentDB.findAll({
        attributes: ['id', 'username'],
        include: [{
            model: db.Person,
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
