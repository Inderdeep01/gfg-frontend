import { ADD_ACCOUNT_TRANSACTION, SET_ACCOUNT_TRANSACTIONS } from "../Constants/TransactionsConstant";

export const AccountTransactionsReducer=(state=[],action)=>{
    switch(action.type)
    {
        case SET_ACCOUNT_TRANSACTIONS:
            return {transactions:action.payload};
        case ADD_ACCOUNT_TRANSACTION:
            return {transactions:[action.payload,...state.transactions]}
        default:
            return state;
    }
}