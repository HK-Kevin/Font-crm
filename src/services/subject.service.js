import {
  url
} from '../assets/config';
import axios from 'axios';
const domain = 'subject';
const subUrl = `${url}/${domain}`;


export let httpAdd = (data) => {
  return axios({
    method: 'POST',
    url: subUrl + '/add',
    data: data
  })
}

export let httpTable = (data) => {
  return axios({
    method: 'POST',
    url: subUrl + '/all',
    data: data
  })
}

export let httpOne = (id) => {
  return axios({
    method: 'GET',
    url: subUrl + `/one/?id=${id}`
  })
}

export let httpDelete = (idArr) => {
  return axios({
    method: 'POST',
    url: subUrl + `/delete`,
    data: idArr
  })
}

export let httpUpdate = (data) => {
  return axios({
    method: 'PUT',
    url: subUrl + `/update`,
    data: data
  })
}
