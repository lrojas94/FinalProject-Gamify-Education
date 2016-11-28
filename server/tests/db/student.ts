import * as db from '../../models/db';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import lang from '../../messages';

chai.use(chaiAsPromised);
chai.should();
db.syncAll()
.then(() => {
  describe('Student Model:', () => {
      before((done) => {
        db.Person.bulkCreate([{
            name: 'Luis Eduardo',
            lastName: 'Rojas Cabrera',
            birthDay: new Date('April 28, 1994'),
            gender: 'm'
        },
        {
            name: 'Manuel Emilio',
            lastName: 'Urena Hernandez',
            birthDay: new Date('October 25, 1994'),
            gender: 'm'
        },
        {
            name: 'Frankie Francisco',
            lastName: 'Garabito Batista',
            birthDay: new Date('August 22, 1994'),
            gender: 'm'
        }])
        .then(() => done());
      });

      describe('Create Student With Person', () => {
          it('Should correctly create a Student given a valid PersonId.', (done) => {
              db.Person.findOne()
              .then((person) => {
                  db.Student.create({
                      username: 'lrojas',
                      password: 'lrojas',
                      personId: person.get('id')
                  })
                  .then(() => {
                      db.Student.findOne({
                          where: {
                              id: 1
                          },
                          include: [{
                              model: db.Person,
                              as: 'person'
                          }]
                      })
                      .then((student) => {
                          student.username.should.equal('lrojas');
                          student.password.should.equal('lrojas');
                          student.person.name.should.equal('Luis Eduardo');
                          student.person.lastName.should.equal('Rojas Cabrera');
                          student.person.birthDay.getTime().should.equal(new Date('April 28, 1994').getTime());
                          student.person.gender.should.equal('m');
                          done();
                      });
                  });
              });
          });

          it('Should not be created with a non-existant personId.', () => {
              return db.Student.create({
                  username: 'murena',
                  password: 'murena',
                  personId: -1
              }).should.eventually.be.rejected;
          });

          it('Should not be created with a personId already in use.', () => {
              return db.Student.create({
                  username: 'fgarabito',
                  password: 'fgarabito',
                  personId: 1
              }).should.eventually.be.rejected;
          });
      });

      describe('Creating student with no Person:', () => {
          it('Should return in error.', () => {
              return db.Student.create({
                  username: 'lrojas2',
                  password: 'lrojas'
              }).should.eventually.be.rejected;
          });
      });
  });
});
