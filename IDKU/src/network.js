const apiTable = {
  '': {
    type: 2,
    protocol: 'http',
    // ip: '192.168.0.86',
    ip: '218.108.32.142',
    dev_domain: 'xuebei.atzhixiao.com',
    domain: 'api.xuebei001.com',
    port: ':9000',
    project: '/'
  },
  'xb/': {
    type: 2,
    protocol: 'http',
    // ip: '192.168.0.86',
    ip: '218.108.32.142',
    dev_domain: 'xuebei.atzhixiao.com',
    domain: 'api.xuebei001.com',
    port: ':9000',
    project: '/'
  }
}
const webUrl ='https://m.atzhixiao.com';

export default{
  compoundUrl: compoundUrl,
  webUrl:webUrl
}

function getBaseUrl(api) {
  var table
  if (api.indexOf('xb/') >= 0) {
    table = apiTable['xb/']
  } else {
    table = apiTable['']
  }
  switch (table.type) {
    case 0:// ip
      return table.protocol +"://"+ table.ip + table.port + table.project
    case 1:// dev_domain
      return table.protocol +"://"+ table.dev_domain + table.project
    case 2:// on-line
      return table.protocol+'s'+"://" + table.domain + table.project
  }
}

function parseApi(api) {
  for (var key in apiTable) {
    if (key) {
      api = api.replace(key, '')
    }
  }
  return api
}

function compoundUrl(api) {
  return getBaseUrl(api) + parseApi(api)
}
