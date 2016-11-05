

export class Achievement {
  id: number;
  name: string;
  description: string;
  thresholdQuantity: string;
  thresholdPercent: string;
  topicId: string;
  difficultyId: string;
  iconURL: string;

  static fromJSON(data) {
    return teacher = new Achievement(data);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      iconURL: this.iconURL,
      thresholdQuantity: this.thresholdQuantity,
      thresholdPercent: this.thresholdPercent,
      topicId: this.topicId,
      difficultyId: this.difficultyId,
    }
  }

  constructor(dataId, name, description, iconURL) {
    if(dataId) {
      if(arguments.length === 1) { //Only data was passed
        var data = dataId;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.iconURL = data.iconURL;
        this.thresholdQuantity = data.thresholdQuantity;
        this.thresholdPercent = data.thresholdPercent;
        this.topicId = data.topicId;
        this.difficultyId = data.difficultyId;
      }
      else {
        this.id = dataId;
        this.name = name;
        this.description = description;
        this.thresholdQuantity = thresholdQuantity;
        this.thresholdPercent = thresholdPercent;
        this.topicId = topicId;
        this.difficultyId = difficultyId;
        this.iconURL = iconURL;
      }
    }
    else return null;
  }
}
