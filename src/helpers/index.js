
import parser from './parser';

const date = new Date();
const tommorow = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;

const getDate = tommorow;

module.export = {
  getDate,
  parser,
};
