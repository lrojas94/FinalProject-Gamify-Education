import * as db from '../../models/db';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import lang from '../../messages';

chai.use(chaiAsPromised);
chai.should();
db.initialize();

describe('Teacher Model', () => {
  before((done) => {
    db.Teacher.sync({
      force: true
    })
    .then(() => done());
  });

  describe('Create Teacher With Person', () => {
    it('Should correctly create a Teacher given a valid PersonId.', (done) => {
      db.Person.findOne()
      .then((person) => {
        db.Teacher.create({
          username: 'lrojas',
          password: 'lrojas',
          degree: 'Math Student',
          personId: person.get('id')
        })
        .then(() => {
          // Find teacher with attributes now:
          db.Teacher.findOne({
            where: {
              id: 1
            },
            include: [{
              model: db.Person,
              as: 'person'
            }]
          })
          .then((teacher) => {
            teacher.username.should.equal('lrojas');
            teacher.password.should.equal('lrojas');
            teacher.degree.should.equal('Math Student');
            teacher.person.name.should.equal('Luis Eduardo');
            teacher.person.lastName.should.equal('Rojas Cabrera');
            teacher.person.birthDay.getTime().should.equal(new Date('April 28, 1994').getTime());
            teacher.person.gender.should.equal('m');
            done();
          });
        });
      });
    });

    it('Should not be created with a non-existant personId', () => {
      return db.Teacher.create({
        username: 'murena',
        password: 'murena',
        personId: -1
      }).should.eventually.be.rejected;
    });

    it('Should not be created with a personId already in use', () => {
      return db.Teacher.create({
        username: 'fgarabito',
        password: 'fgarabito',
        personId: 1 // this Id is used before in the Create success test.
      }).should.eventually.be.rejected;
    });
  });

  describe('Creating teacher with no Person', () => {
    it('Should return in error.', () => {
      return db.Teacher.create({
        username: 'lrojas2',
        password: 'lrojas'
      }).should.eventually.be.rejected;
    });
  });

});
