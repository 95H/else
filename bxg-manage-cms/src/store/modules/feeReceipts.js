import api from '@/api'
const feeReceipts = {
    state: {
        pageData: {
            data: [],
            pageNum: 0,
            total: 0
        },
        depositDetail: {
            deposit: {},
            depositPayment: {}
        },
        refundDetail: {}
    },
    actions: {
        async getDepositList({ commit, state }, params) {
            let result = await api.getDepositList(params);
            if (result.status === 200) {
                commit('depositList', result.result)
            }
        },
        async getDepositDetail({ commit, state }, params) {
            let result = await api.getDepositDetail(params);
            if (result.status === 200) {
                commit('depositDetail', result.result)
            }
        },
        async getDepositRefundDetail({ commit, state }, params) {
            let result = await api.getDepositRefundDetail(params);
            if (result.status === 200) {
                commit('refundDetail', result.result)
            }
        }
    },
    getters: {

    },
    mutations: {
        depositList(state, data) {
            state.pageData = {
                data: data.list,
                pageNum: data.pageNum,
                total: data.total
            }
        },
        depositDetail(state, data) {
            state.depositDetail.deposit = data.deposit;
            state.depositDetail.depositPayment = data.depositPayment;
        },
        refundDetail(state, data) {
            state.refundDetail = data;
        }
    }
}

export default feeReceipts;
