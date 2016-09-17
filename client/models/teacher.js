import { Person } from './person';
export class Teacher {
  id: number;
  username: string;
  degree: string;
  personId: int;
  person: Person;

  static fromJSON(data) {
    return teacher = new Teacher(data);
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      degree: this.degree,
      personId: this.personId,
      person: this.person,
    }
  }

  constructor(dataId, username, degree, personId, person,) {
    if(dataId) {
      if(arguments.length === 1) { //Only data was passed
        var data = dataId;
        this.id = data.id;
        this.username = data.username;
        this.degree = data.degree;
        this.personId = data.personId;
        this.person = data.person ? new Person(data.person) : null;
      }
      else {
        this.id = dataId;
        this.username = username;
        this.degree = degree;
        this.personId = personId;
        this.person = person ? new Person(person) : null;
      }
    }
    else return null;
  }
}
