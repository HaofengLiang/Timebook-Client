import axios from 'axios';

export async function searchUser(userInput) {
  return axios.post(`/searchEmails`, { userInput });
}
