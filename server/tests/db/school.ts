import * as db from '../../models/db';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import lang from '../../messages';

chai.use(chaiAsPromised);
chai.should();
db.initialize();


describe('School Model', () => {
  beforeEach(() => {
    return db.School.sync({
      force: true
    });
  });
  describe('Create school with no errors.', () => {
    it('Should correctly create a School when information provided is valid and correct.', () => {
      return db.School.create({
        name: 'Juan XXIII',
        telephone: '809-707-0266'
      })
      .then((school)=> {
        school.name.should.equal('Juan XXIII');
        school.telephone.should.equal('809-707-0266');
      });
    });
  });

  describe('School cannot have null values.', () => {
    it('Should throw error when having name = null.',
        () => {
          return db.School.create({
            name: null,
            telephone: '809-707-0266'
          }).should.eventually.be.rejected;
      });

      it('Should throw error when having telephone = null.',
          () => {
            return db.School.create({
              name: 'Juan XXIII',
              telephone: null
            }).should.eventually.be.rejected;
      });
    });
