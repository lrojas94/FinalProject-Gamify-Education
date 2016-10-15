export class School {
  id: number;
  name: string;
  address: string;
  telephone: string;
  website: string;

  static fromJSON(data) {
    return teacher = new School(data);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      telephone: this.telephone,
      website: this.website,
    }
  }

  constructor(dataId,  name, address, telephone, website) {
    if(dataId) {
      if(arguments.length === 1) { //Only data was passed
        var data = dataId;
        this.id = data.id;
        this.name = data.name;
        this.address = data.address;
        this.telephone = data.telephone;
        this.website = data.website;
      }
      else {
        this.id = dataId;
        this.name = name;
        this.address = address;
        this.telephone = telephone;
        this.website = website;
      }
    }
    else return null;
  }
}
