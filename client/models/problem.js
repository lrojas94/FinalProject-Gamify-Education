export class Problem {
  id: number;
  problem: string;
  url: string;
  solutions: object[];
  difficultyId: number;
  topicId: number;

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
      difficultyId: this.difficultyId
    }
  }

  constructor(dataId, problem, url, solutions, topicId, difficultyId) {
    if(dataId) {
      if(arguments.length === 1) { //Only data was passed
        var data = dataId;
        this.id = data.id;
        this.problem = data.problem;
        this.url = data.url;
        this.solutions = data.solutions;
        this.topicId = data.topicId;
        this.difficultyId = data.difficultyId;
      }
      else {
        this.id = dataId;
        this.problem = problem;
        this.url = url;
        this.solutions = solutions;
        this.topicId = topicId;
        this.difficultyId = difficultyId;
      }
    }
    else return null;
  }
}
