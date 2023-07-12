import axios from 'axios';

const apiUrl = 'http://localhost:8080/v1';

export async function searchUser(userInput) {
  return axios.post(`${apiUrl}/searchEmails`, { userInput });
}
