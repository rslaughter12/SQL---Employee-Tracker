import  init  from './utilities/index.js';
import inquirer from 'inquirer';
import dotenv from 'dotenv';

dotenv.config();
console.log('Welcome to the Employee Tracker!');

try {
  init();
} catch (error) {
  console.error(error);
}