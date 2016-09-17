interface Constants {
  DATABASE_NAME: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  JWT_SECRET: string;
  JWT_BODY_PARAM: string;
  IMG_API_SERVER_ADDRESS: string;
};

var dev: Constants  = {
  DATABASE_NAME: 'gamifyeducation',
  DATABASE_USERNAME: 'gamifyeducation',
  DATABASE_PASSWORD: 'gamifyeducation',
  DATABASE_HOST: 'localhost',
  DATABASE_PORT: 5432,
  JWT_SECRET: '61467AAED82BDD9A4D26AA98AA1FA6DB256FA922DE3EA9F2FB49080BF204A442',
  JWT_BODY_PARAM: 'token',
  IMG_API_SERVER_ADDRESS: 'http://localhost:3001/'
};

var prod: Constants = {
  DATABASE_NAME: 'dfobvf9gsps849',
  DATABASE_USERNAME: 'hjttbwsqozycmo',
  DATABASE_PASSWORD: 'eGxoK_KQkj75sSycikbXergEz4',
  DATABASE_HOST: 'ec2-54-243-249-176.compute-1.amazonaws.com',
  DATABASE_PORT: 5432,
  JWT_SECRET: '61467AAED82BDD9A4D26AA98AA1FA6DB256FA922DE3EA9F2FB49080BF204A442',
  JWT_BODY_PARAM: 'token',
  IMG_API_SERVER_ADDRESS: 'http://104.131.21.204/'
};

export enum QueryStatus {
    SUCCESS,
    ERROR
}

export interface ResponseMessage {
    status?: QueryStatus;
    message?: string;
    data?: any;
}

export interface JWTTokenValues {
    username: string;
    name: string;
    jwt_token?: string;
}

export var constants = process.env.NODE_ENV === 'production' ? prod : dev;
