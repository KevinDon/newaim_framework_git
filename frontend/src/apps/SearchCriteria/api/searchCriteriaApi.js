const searchCriteriaApi = {
  list (vm, query, callback) {
    vm.$http.post('/searchCriteria/list/', query).then(res => {
      callback(res, query)
    })
  }
}

export default searchCriteriaApi

