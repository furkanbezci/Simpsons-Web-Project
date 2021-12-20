import axios from 'axios';

const simpsonsUrl = window?.config?.simpsonsService;
console.log(simpsonsUrl);

export const GetMapping = path => {
  console.log(path);
  return axios.get(`${simpsonsUrl}${path}`);
};
export const GetMappingAvatar = path => {
  return axios.get(`${path}`);
};
