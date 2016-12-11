

export class Topic {
  id: number;
  name: string;
  description: string;
  example: string;
  groupId: number;
  correctAnswers: number;
  totalAnswers: number;
  difficulties: object;

  static fromJSON(data) {
    return teacher = new Topic(data);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      example: this.example,
      groupId: this.groupId,
      correctAnswers: this.correctAnswers,
      totalAnswers: this.totalAnswers,
      difficulties: this.difficulties,
    }
  }

  constructor(dataId, name, description, example, groupId) {
    if(dataId) {
      if(arguments.length === 1) { //Only data was passed
        var data = dataId;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.example = data.example;
        this.groupId = data.groupId;
        this.correctAnswers = data.correctAnswers;
        this.totalAnswers = data.totalAnswers;
        this.difficulties = data.difficulties;

      }
      else {
        this.id = dataId;
        this.name = name;
        this.description = description;
        this.example = example;
        this.groupId = groupId;
      }
    }
    else return null;
  }
}
