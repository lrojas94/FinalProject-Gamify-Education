export class Difficulty {
  id: number;
  name: string;
  description: string;

  static fromJSON(data) {
    return teacher = new Difficulty(data);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    }
  }

  constructor(dataId, name, description, ) {
    if(dataId) {
      if(arguments.length === 1) { //Only data was passed
        var data = dataId;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
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
