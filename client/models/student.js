import { Person } from './person';
import { Group } from './group';

export class Student {
  id: number;
  username: string;
  personId: number;
  groupId: number;
  person: Person;
  group: Group;
  topics: object;
  difficulties: object;


  static fromJSON(data) {
    return new Student(data);
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      personId: this.personId,
      groupId: this.groupId,
      person: this.person,
      group: this.group,
      topics: this.topics,
      difficulties: this.difficulties,
    }
  }

  constructor(dataId, username, degree, personId, groupId, person, group) {
    if(dataId) {
      if(arguments.length === 1) { //Only data was passed
        var data = dataId;
        this.id = data.id;
        this.username = data.username;
        this.personId = data.personId;
        this.groupId = data.groupId;
        this.person = data.person ? new Person(data.person) : null;
        this.group = data.group ? new Group(data.group) : null;
        this.topics = data.topics
        this.difficulties = data.difficulties
      }
      else {
        this.id = dataId;
        this.username = username;
        this.degree = degree;
        this.personId = personId;
        this.groupId = groupId;
        this.person = person ? new Person(person) : null;
        this.group = group ? new Group(group) : null;
      }
    }
    else return null;
  }
}
