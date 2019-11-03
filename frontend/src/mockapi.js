const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://localhost:8080 ' // 定义默认域名，随便写
const code = 200 // 返回的状态码

const LoginData = req => {
  let params = JSON.parse(req.body)

  let user = {}
  user.emailAddress = params.account + '@163.com'
  user.billingaddress = '106 Crbbes Creek Road'
  user.firstname = params.account
  user.suburb = ''
  user.lastname = '2483'
  user.postcode = '0412849600'
  user.phone = '0412849600'
  user.state = 'New soth wales'
  user.website = 'www.budgetfurnitureonline.com au'
  user.country = 'Australia'

  // 返回状态码和文章数据posts
  return {
    code,
    user
  }
}

const ProductData = req => {
  let products = []

  for (let i = 0; i < 50; i++) {
    let product = {
      descript: Random.title(),
      sku: Random.cname(),
      shopifyprice: Random.float(0, 50, 0, 2),
      costprice: Random.float(50, 100, 0, 2),
      images: '/static/test.png'
    }
    products.push(product)
  }

  // 返回状态码和文章数据posts
  return {
    code,
    products
  }
}
//
// const ProductData = req => {
//   let products = []
//
//   form (let i = 0; i < 50; i++) {
//     let product = {
//       descript: Random.title(),
//       sku: Random.cname(),
//       shopifyprice: Random.float(0, 50, 0, 2),
//       costprice: Random.float(50, 100, 0, 2),
//       images: '/static/test.png'
//     }
//     products.push(product)
//   }
//
//   // 返回状态码和文章数据posts
//   return {
//     code,
//     products
//   }
// }

const accountData = () => {
  let data = [{
    account: 'Owen',
    first_name: 'Owen',
    last_name: 'Zheng',
    email:'1845268783@qq.com',
    department:'IT'
  }, {
    account: 'Zico',
    first_name: 'Zico',
    last_name: 'Guo',
    email:'21520993@qq.com',
    department:'IT'
  }, {
    account: 'Kevin',
    first_name: 'Kevin',
    last_name: 'Don',
    email:'kevincn.tang@outlook.com',
    department:'IT - Frontend'
  }]

  return {
    status: 200,
    success: true,
    msg:'The query is successful',
    data :data
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/login`, 'post', LoginData)
Mock.mock(`${domain}/api/products`, 'post', ProductData)
Mock.mock('http://localhost:8080/api/accounts/list', 'get', accountData)
