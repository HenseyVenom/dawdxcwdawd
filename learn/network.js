const webUrl = 'http://218.108.32.142:9005';
const codeUrl = 'http://218.108.32.142:9000/'
const apiTable={
  '':{
    type:2,
    protocol :"https://",
    ip:"192.168.0.86",
    // ip:"218.108.32.142",
    dev_domain: "xuebei.atzhixiao.com",
    domain : "xuebei.atzhixiao.com",
    port : ":8081",
    project:"/"
  },
  'xb/': {
    type: 2,
    protocol: "https://",
    // ip: "192.168.0.86",
     ip: "218.108.32.142",
    dev_domain: "api.xuebei001.com",
    domain: "api.xuebei001.com",
    port: ":9000",
    project: "/"
  }
}

export default{
  compoundUrl: compoundUrl,
  webUrl:webUrl,
  codeUrl: codeUrl
}

function getBaseUrl(api) {
  var table;
  if(api.indexOf('xb/')>=0){
    table = apiTable['xb/']
  }else{
    table = apiTable['']
  }
  switch(table.type){
    case 0://ip
      return table.protocol + table.ip + table.port + table.project;
    case 1://dev_domain
      return table.protocol + table.dev_domain + table.project;
    case 2://on-line
      return table.protocol + table.domain + table.project;
  }
}

function parseApi(api){
  for (var key in apiTable){
    if(key){
      api = api.replace(key, '')
    }
  }
  return api
}

function compoundUrl(api){
  return getBaseUrl(api) + parseApi(api)
}

function getBaseImageUrl() {
  return "http://192.168.0.88:8087"
}