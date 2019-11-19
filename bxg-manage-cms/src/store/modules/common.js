
export function commonState() {
  return {
    data: [],
    loading: false,
    error: false,
    pageInfo: {
      pageNumber: 1,
      pageSize: 10,
      total: 0
    }
  }
}

export function queryAction(fetchData, requestType, successType, errorType) {
  return async function run({ commit }, params) {
    commit(requestType)

    let data = await fetchData(params)

    if (data.status == 200) {
      commit(successType, data.result)
    } else {
      commit(errorType)
    }
  }
}