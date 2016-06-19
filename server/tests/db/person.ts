import * as db from '../../models/db';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import lang from '../../messages';

chai.use(chaiAsPromised);
chai.should();
db.initialize();

var nowDate = new Date();

describe('Person Model', () => {
  beforeEach(() => {
    return db.Person.sync({
      force: true
    });
  });

  describe('Create person with no errors.', () => {
    it('Should correctly create a person when information provided is valid and correct.', () => {
      return db.Person.create({
        name: 'Luis Eduardo',
        lastName: 'Rojas Cabrera',
        birthDay: nowDate,
        gender: 'm'
      })
      .then((person) => {
        person.name.should.equal('Luis Eduardo');
        person.lastName.should.equal('Rojas Cabrera');
        person.birthDay.getTime().should.equal(nowDate.getTime());
        person.gender.should.equal('m');
      });
    });
  });

  describe('Create person with gender not equal "m" or "f"', () => {
    it(`Should throw an error when something other than 'm' or 'f'
        is used as a Gender.`,
        () => {
          return db.Person.create({
            name: 'Random',
            lastName: 'Person',
            birthDay: new Date(),
            gender: 'x'
          }).should.eventually.be.rejected;
        });
  });

  describe('Person cannot have null values.', () => {
    it(`Should throw error when having name = null.`,
        () => {
          return db.Person.create({
            name: null,
            lastName: 'Person',
            birthDay: new Date(),
            gender: 'm'
          }).should.eventually.be.rejected;
    });

    it(`Should throw error when having lastName = null.`,
        () => {
          return db.Person.create({
            name: 'Person',
            lastName: null,
            birthDay: new Date(),
            gender: 'm'
          }).should.eventually.be.rejected;
    });

    it(`Should throw error when having birthDay = null.`,
        () => {
          return db.Person.create({
            name: 'Name',
            lastName: 'Person',
            birthDay: null,
            gender: 'm'
          }).should.eventually.be.rejected;
    });

    it(`Should throw error when having gender = null.`,
        () => {
          return db.Person.create({
            name: 'Name',
            lastName: 'Person',
            birthDay: new Date(),
            gender: null
          }).should.eventually.be.rejected;
    });
  });

});
