import { GET_ACCOUNT_BALANCE_SUCCESS } from "../Constants/AccountBalanceConstant";

export const changeBalance=(tx)=>async(dispatch,getState)=>{
    const {userLogin}=getState();
    const {userInfo}=userLogin;
    const {accountBalance}=getState();
    const {balances}=accountBalance;
    let add;
      if(tx?.from?._id===userInfo?._id){
        add=false;
      }
      if(tx?.to?._id===userInfo?._id){
        add=true;
      }
      const currCng=balances?.filter((curr)=>curr?.currency===tx?.settlement)[0];
      const left=balances?.filter((curr)=>curr?.currency!==tx?.settlement);
      let payload;
      if(add){
        payload=[
          {
            currency:tx?.settlement,
            balance:currCng?.balance?JSON.stringify(JSON.parse(currCng.balance)+JSON.parse(tx.settledAmount)):tx?.settledAmount,
          },
          ...left
        ]
      }
      else{
        payload=[
          {
            currency:tx?.settlement,
            balance:JSON.stringify(JSON.parse(currCng?.balance)-JSON.parse(tx?.settledAmount))
          },
          ...left
        ]
      }
      dispatch({type:GET_ACCOUNT_BALANCE_SUCCESS,payload:payload})
}