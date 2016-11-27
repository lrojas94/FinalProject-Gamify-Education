export class Group {
  id: number;
  year: string;
  grade: string;
  schoolId: number;

  static fromJSON(data) {
    return teacher = new Group(data);
  }

  toJSON() {
    return {
      id: this.id,
      year: this.year,
      grade: this.grade,
      schoolId: this.schoolId
    }
  }

  constructor(dataId, year, grade) {
    if(dataId) {
      if(arguments.length === 1) { //Only data was passed
        var data = dataId;
        this.id = data.id;
        this.year = data.year;
        this.grade = data.grade;
        this.schoolId = data.schoolId;
      }
      else {
        this.id = dataId;
        this.year = year;
        this.grade = grade;
        this.schoolId = schoolId;
      }
    }
    else return null;
  }
}
