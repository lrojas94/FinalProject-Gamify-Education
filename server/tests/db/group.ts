import * as db from '../../models/db';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import lang from '../../messages';

chai.use(chaiAsPromised);
chai.should();
db.initialize();

describe('Group Model', () => {

  describe('Create group with no errors.', () => {
    it('Should correctly create a group when information provided is valid and correct.', () => {
      return db.Group.create({
        year: '2016-2017',
        grade: '7'
      })
      .then((group) => {
        group.year.should.equal('2016-2017');
        group.grade.should.equal('7');
      });
    });
  });

  describe('Group cannot have null values.', () => {
    it('Should throw error when having year =null', () => {
      return db.Group.create({
        year: null,
        grade: '7'
      }).should.eventually.be.rejected;
    });

    it('Should throw error when having grade = null.', () => {
      return db.Group.create({
        year: '2016-2017',
        grade: null
      }).should.eventually.be.rejected;
    });
  });
});
