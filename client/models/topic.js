export class Topic {
  id: number;
  name: string;
  description: string;
  example: string;

  static fromJSON(data) {
    return teacher = new Topic(data);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      example: this.example,
    }
  }

  constructor(dataId, name, description, example) {
    if(dataId) {
      if(arguments.length === 1) { //Only data was passed
        var data = dataId;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.example = data.example;
      }
      else {
        this.id = dataId;
        this.name = name;
        this.description = description;
        this.example = example;
      }
    }
    else return null;
  }
}
