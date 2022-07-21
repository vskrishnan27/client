

export const UPDATE_LIST = 'UPDATE_LIST'
export const UPDATE_TOTAL_COST = 'UPDATE_TOTAL_COST'
export const UPDATE_USER_DETAIL = 'UPDATE_USER_DETAIL'
export const UPDATE_SALES_ID = 'UPDATE_SALES_ID'


export const updateBill = (list = []) => ({
    type: UPDATE_LIST,
    payload: list
}
)

export const updateTotalCost = (cost = 0) => ({
    type: UPDATE_TOTAL_COST,
    payload: cost
}
)

export const updateUserDetail = (userDetail = {}) => ({
    type: UPDATE_USER_DETAIL,
    payload: userDetail
}
)

export const updateSalesId = (id = 0) => ({
    type: UPDATE_SALES_ID,
    payload: id
}
)