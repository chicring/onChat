import request from "../index";

export function getLogs(query: object) {
  return request({
    url: '/logs/find',
    method: 'post',
    data: query
  });
}

export function getLogCountDetail() {
  return request({
    url: '/logs/amount',
    method: 'get',
  });
}


export function getOverview() {
  return request({
    url: '/logs/overview',
    method: 'get',
  });
}
