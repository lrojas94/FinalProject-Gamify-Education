export class Problem {
  id: number;
  problem: string;
  solutions: object[];

  static fromJSON(data) {
    return teacher = new Problem(data);
  }

  toJSON() {
    return {
      id: this.id,
      problem: this.problem,
      solutions: this.solutions,
    }
  }

  constructor(dataId, problem, solutions, personId, person,) {
    if(dataId) {
      if(arguments.length === 1) { //Only data was passed
        var data = dataId;
        this.id = data.id;
        this.problem = data.problem;
        this.solutions = data.solutions;
      }
      else {
        this.id = dataId;
        this.problem = problem;
        this.solutions = solutions;
      }
    }
    else return null;
  }
}
