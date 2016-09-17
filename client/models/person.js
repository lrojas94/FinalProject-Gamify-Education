export class Person {
  id: number;
  name: string;
  lastName: string;
  birthDay: Date;
  gender: string;

  static fromJSON(data) {
    return teacher = new Teacher(data);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      birthDay: this.birthDay,
      gender: this.gender,
    }
  }

  constructor(dataId, name, lastName, birthDay, gender,) {
    if(dataId) {
      if(arguments.length === 1) { //Only data was passed
        var data = dataId;
        this.id = data.id;
        this.name = data.name;
        this.lastName = data.lastName;
        this.birthDay = data.birthDay;
        this.gender = data.gender;
      }
      else {
        this.id = dataId;
        this.name = name;
        this.lastName = lastName;
        this.birthDay = birthDay;
        this.gender = gender;
      }
    }
    else return null;
  }
}
