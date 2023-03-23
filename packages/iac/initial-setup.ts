import axios from 'axios';
import * as fs from 'fs';
import { UserLogin } from './interfaces/user_login';
import dotenv from 'dotenv';
dotenv.config({ path: './../../.env' });

const header = { headers: { 'Content-Type': 'application/json' } };

const jsonData = {
  username: `${process.env.HASHICUPS_USERNAME || 'yassir_user'}`,
  password: `${process.env.HASHICUPS_PASSWORD || 'test@123'}`,
};
const data = JSON.stringify(jsonData);

/**
 * It creates a folder called `Orders` if it doesn't exist, then creates two folders inside it called
 * `order-1` and `order-2` if they don't exist, then creates four files inside those folders called
 * `1.json` and `2.json` if they don't exist, then creates a user if it doesn't exist, then signs in
 */
function initialSetup(): void {
  const directoryPath = `./${
    process.env.HASHICUPS_ORDERS_FOLDER_NAME || 'Orders'
  }`;

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }

  const order1Path = `./${directoryPath}/order-1`;
  if (!fs.existsSync(order1Path)) {
    fs.mkdirSync(order1Path);
  }

  const coffee1 = `./${order1Path}/1.json`;
  const coffee1Data = {
    quantity: 2,
  };
  if (!fs.existsSync(coffee1)) {
    fs.writeFile(coffee1, JSON.stringify(coffee1Data), (error) => {
      if (error) {
        console.error(error);
      }
    });
  }

  const coffee2 = `./${order1Path}/2.json`;
  const coffee2Data = {
    quantity: 4,
  };
  if (!fs.existsSync(coffee2)) {
    fs.writeFile(coffee2, JSON.stringify(coffee2Data), (error) => {
      if (error) {
        console.error(error);
      }
    });
  }

  const order2Path = `./${directoryPath}/order-2`;
  if (!fs.existsSync(order2Path)) {
    fs.mkdirSync(order2Path);
  }

  const coffee3 = `./${order2Path}/1.json`;
  const coffee3Data = {
    quantity: 3,
  };
  if (!fs.existsSync(coffee3)) {
    fs.writeFile(coffee3, JSON.stringify(coffee3Data), (error) => {
      if (error) {
        console.error(error);
      }
    });
  }

  const coffee4 = `./${order2Path}/2.json`;
  const coffee4Data = {
    quantity: 6,
  };
  if (!fs.existsSync(coffee4)) {
    fs.writeFile(coffee4, JSON.stringify(coffee4Data), (error) => {
      if (error) {
        console.error(error);
      }
    });
  }

  axios
    .post(`http://127.0.0.1:19090/signup`, data, header)
    .then(() => signIn())
    .catch((error) => {
      if (error.response.data.indexOf('User already exists') > -1) {
        return signIn();
      } else {
        console.error(error);
      }
    });
}

/**
 * It sends a POST request to the signin endpoint with the data and header objects, and then logs the
 * token to the console
 */
const signIn = async (): Promise<void> => {
  const response = await axios.post<UserLogin>(
    `http://127.0.0.1:19090/signin`,
    data,
    header
  );
  console.log(`token: ${response.data.token}`);
  process.env.HASHICUPS_TOKEN = response.data.token;
};

initialSetup();
