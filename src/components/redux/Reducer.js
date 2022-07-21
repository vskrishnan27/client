
import { UPDATE_LIST, UPDATE_SALES_ID, UPDATE_TOTAL_COST, UPDATE_USER_DETAIL } from './Actions.js'

const initialState = {
    billList: [],
    totalCost: 0,
    userDetail: {
        "name": "sample",
        "address": "sample",
        "phone": "0000"
    },
    salesId: 0

}

export const billListReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_LIST:
            return {
                ...state,
                billList: action.payload
            }
        case UPDATE_TOTAL_COST:
            return {
                ...state,
                totalCost: action.payload
            }
        case UPDATE_USER_DETAIL:
            return {
                ...state,
                userDetail: action.payload
            }
        case UPDATE_SALES_ID:
            return {
                ...state,
                salesId: action.payload
            }
        default:
            return state
    }
}

