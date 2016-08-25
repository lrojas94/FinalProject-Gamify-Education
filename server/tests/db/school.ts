import {School} from '../../models/db';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import lang from '../../messages';

chai.use(chaiAsPromised);
chai.should();


describe('School Model', () => {

  describe('Create school with no errors.', () => {
    it('Should correctly create a School when information provided is valid and correct.', () => {
      return School.create({
        name: 'Juan XXIII',
        telephone: '809-707-0266',
        address: 'PUCMM KM 6'
      })
      .then((school) => {
        school.name.should.equal('Juan XXIII');
        school.telephone.should.equal('809-707-0266');
      });
    });
  });

  describe('School cannot have null values.', () => {
    it('Should throw error when having name = null.',
        () => {
          return School.create({
            name: null,
            telephone: '809-707-0266',
            address: 'PUCMM KM 6'
          }).should.eventually.be.rejected;
      });

      it('Should throw error when having telephone = null.',
          () => {
            return School.create({
              name: 'Juan XXIII',
              telephone: null,
              address: 'PUCMM KM 6'
            }).should.eventually.be.rejected;
      });
    });
});
