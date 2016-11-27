export class Problem {
  id: number;
  problem: string;
  url: string;
  solutions: object[];
  difficultyId: number;
  topicId: number;
  groupId: number;

  static fromJSON(data) {
    return teacher = new Problem(data);
  }

  toJSON() {
    return {
      id: this.id,
      problem: this.problem,
      url: this.url,
      solutions: this.solutions,
      topicId: this.topicId,
      difficultyId: this.difficultyId,
      groupId: this.groupId,
    }
  }

  constructor(dataId, problem, url, solutions, topicId, difficultyId, groupId) {
    if(dataId) {
      if(arguments.length === 1) { //Only data was passed
        var data = dataId;
        this.id = data.id;
        this.problem = data.problem;
        this.url = data.url;
        this.solutions = data.solutions;
        this.topicId = data.topicId;
        this.difficultyId = data.difficultyId;
        this.groupId = data.groupId;
      }
      else {
        this.id = dataId;
        this.problem = problem;
        this.url = url;
        this.solutions = solutions;
        this.topicId = topicId;
        this.difficultyId = difficultyId;
        this.groupId = groupId;
      }
    }
    else return null;
  }
}
