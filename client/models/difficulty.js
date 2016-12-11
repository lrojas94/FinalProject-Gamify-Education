export class Difficulty {
  id: number;
  name: string;
  description: string;
  correctAnswers: number;
  totalAnswers: number;
  topics: object;

  static fromJSON(data) {
    return teacher = new Difficulty(data);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      correctAnswers: this.correctAnswers,
      totalAnswers: this.totalAnswers,
      topics: this.topics,
    }
  }

  constructor(dataId, name, description) {
    if(dataId) {
      if(arguments.length === 1) { //Only data was passed
        var data = dataId;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.correctAnswers = data.correctAnswers;
        this.totalAnswers = data.totalAnswers;
        this.topics = data.topics;
      }
      else {
        this.id = dataId;
        this.name = name;
        this.description = description;
      }
    }
    else return null;
  }
}
