import { Backdrop, Box, Fade, Modal, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from "react-router-dom";
import { currencySymbol } from "../utils/gradientAndImages";
const useStyle = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    outline: "0px solid white",
    width: "420px",
    height: "85%",
    display: "flex",
    position:'relative',
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "100%",
      borderRadius: "0px",
    },
    // padding: theme.spacing(2, 4, 3),
  },
}));
var a = [
  "",
  "One ",
  "Two ",
  "Three ",
  "Four ",
  "Five ",
  "Six ",
  "Seven ",
  "Eight ",
  "Nine ",
  "Ten ",
  "Eleven ",
  "Twelve ",
  "Thirteen ",
  "Fourteen ",
  "Fifteen ",
  "Sixteen ",
  "Seventeen ",
  "Eighteen ",
  "Nineteen ",
];
var b = [
  "",
  "",
  "twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

export function inWords (n) {
  if (n < 0)
    return false;
 var single_digit = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
 var double_digit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
 var below_hundred = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
if (n === 0) return 'Zero'
function translate(n) {
  var word = ""
  if (n < 10) {
    word = single_digit[n] + ' '
  }
  else if (n < 20) {
    word = double_digit[n - 10] + ' '
  }
  else if (n < 100) {
    var rem = translate(n % 10)
    word = below_hundred[(n - n % 10) / 10 - 2] + ' ' + rem
  }
  else if (n < 1000) {
    word = single_digit[Math.trunc(n / 100)] + ' Hundred ' + translate(n % 100)
  }
  else if (n < 100000) {
    word = translate(parseInt(n / 1000)).trim() + ' Thousand ' + translate(n % 1000)
  }
  else if (n < 10000000) {
    word = translate(parseInt(n / 100000)).trim() + ' Lakh ' + translate(n % 100000)
  }
  else {
    word = translate(parseInt(n / 10000000)).trim() + ' Crore ' + translate(n % 10000000)
  }
  return word
}
 var result = translate(n) 
return result.trim()+' Only'
}
export const trimAccountNumber=(no)=>{
  return no?.substr(0,4)+' XXXX '+no?.substr(no?.length-4,no?.length);
}
export const CopyToClipboard=(text)=>{
  navigator.clipboard.writeText(text);
}
const TransactionReciept = () => {
  const [open,setOpen]=useState(false);
  const {search} =useLocation(); 
  const [transaction,setTransaction]=useState({});
  const {transactions}=useSelector(state=>state.accountTransactions);
  const [fromMy,setFromMy]=useState(false);
  const [toMy,setToMy]=useState(false);
  const [words,setWords]=useState('');
  const [date,setDate]=useState('')
  useEffect(()=>{
      const query = new URLSearchParams(search);
      const n = query.get('transactionDetails');
      if(n){
        const result=transactions?.filter((t)=>t?._id===n);
        setTransaction(result[0]);
        (result[0]?.from?._id===userInfo?._id)?setFromMy(true):setFromMy(false);
        (result[0]?.to?._id===userInfo?._id)?setToMy(true):setToMy(false);
        setWords(inWords(result[0]?.amount));
        setDate(new Date(result[0].createdAt).toUTCString())
        setOpen(true);
      }
      else{
        setOpen(false);
      }
  },[search])
  const navigate=useNavigate();
  const handleClose = () => {
    navigate('/');
  };
  const {userInfo}=useSelector(state=>state.userLogin);
  const classes = useStyle();
  console.log(transaction);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Box sx={{width:'100%',height:'100%',display:'flex',flexDirection:'column'}}>
              <Box sx={{width:'100%',padding:'15px',display:'flex',gap:'20px',alignItems:'center'}}>
                <ArrowBackIcon sx={{fontSize:'30px',cursor:'pointer'}} onClick={()=>navigate('/')}/>
                <Box sx={{fontSize:'20px'}}>{transaction?.from?._id===userInfo?._id?'Money Paid':transaction?.from!==null?'Money Recieved':'Money Deposited'}</Box>
              </Box>
              <Box sx={{width:'100%',height:'100%',display:'flex',padding:'20px',paddingTop:'10px'}}>
                <Box sx={{
                  border:'1px solid lightgrey',
                  width:'90%',
                  height:'100%',
                  borderRadius:'15px',
                  display:'flex',
                  flexDirection:'column'
                }}>
                  <Box sx={{width:'92%',height:'100%',margin:'20px',marginTop:'20px'}}>
                    <Box sx={{fontSize:'18px',fontWeight:'400'}}>Amount</Box>
                    <Box sx={{fontSize:'25px',fontWeight:'700',display:'flex',alignItems:'center',gap:'15px'}}>{currencySymbol[transaction?.currency]} {transaction?.amount} <img src="/img/greenverified.png" style={{width:'25px'}}/></Box>
                    <Box sx={{ paddingBottom:'20px',borderBottom:'1px solid lightgrey'}}>{transaction?.currency} {words}</Box>
                    <Box sx={{fontSize:'18px',fontWeight:'400',marginTop:'20px'}}>To {toMy && 'Your'}</Box>
                    <Box sx={{fontSize:'25px',fontWeight:'500',display:'flex',alignItems:'center',gap:'15px',position:'relative'}}>{toMy?'Interplanetary Bank':`${transaction?.to?.firstName} ${transaction?.to?.lastName}`} <img src="/img/IPBS.png" style={{width:'70px',position:'absolute',right:'10px'}}/></Box>
                    <Box sx={{paddingBottom:'20px',borderBottom:'1px solid lightgrey'}}> A/C No. - {trimAccountNumber(transaction?.to?.accountNo)} <span style={{color:'#1979e6',cursor:'pointer'}} onClick={()=>CopyToClipboard(transaction?.to?.accountNo)}>Copy</span></Box>
                    {transaction?.from!==null &&
                    <Box>
                    <Box sx={{fontSize:'18px',fontWeight:'400',marginTop:'20px'}}>From {fromMy && 'Your'}</Box>
                    <Box sx={{fontSize:'25px',fontWeight:'500',display:'flex',alignItems:'center',gap:'15px',position:'relative'}}>{fromMy?'Interplanetary Bank':`${transaction?.from?.firstName} ${transaction?.from?.lastName}`} <img src="/img/IPBS.png" style={{width:'70px',position:'absolute',right:'10px'}}/></Box>
                    <Box sx={{paddingBottom:'20px',borderBottom:'1px solid lightgrey'}}> A/C No. - {trimAccountNumber(transaction?.from?.accountNo)} <span style={{color:'#1979e6',cursor:'pointer'}} onClick={()=>CopyToClipboard(transaction?.from?.accountNo)}>Copy</span></Box>
                    
                    <Box>Transaction Hash - {trimAccountNumber(transaction?.txReceipt?.transactionHash)} <span style={{color:'#1979e6',cursor:'pointer'}} onClick={()=>CopyToClipboard(transaction?.txReceipt?.transactionHash)}>Copy</span></Box>
                    </Box>
                    }
                    <Box sx={{marginTop:'20px'}}>{fromMy?'Paid at':transaction?.type==='Deposit'?'Deposited at':'Recieved at'} - {date}</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransactionReciept;
