import { Backdrop, Box, Fade, Modal, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from "react-router-dom";
import { currencySymbol } from "../utils/gradientAndImages";
import getSymbolFromCurrency from "currency-symbol-map";
import numberToWords from 'number-to-words';
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
function capitalizeWords(str) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}
export function inWords(amount, currency) {

  const currencyMap = {
    INR: { name: 'Rupees', subunit: 'Paise' },
    USD: { name: 'Dollars', subunit: 'Cents' },
    CAD: { name: 'Canadian Dollars', subunit: 'Cents' },
    EUR: { name: 'Euros', subunit: 'Cents' },
    JPY: { name: 'Yen', subunit: 'Sen' },
    RUB: { name: 'Rubles', subunit: 'Kopeks' },
    AED: { name: 'Dirhams', subunit: 'Fils' },
    // Add more currencies and their names/subunits as needed
  };

  const { name, subunit } = currencyMap[currency] || { name: currency, subunit: 'Subunit' };

  const [whole, decimal = ''] = String(amount).split('.');

  let result = numberToWords.toWords(parseInt(whole));
  result += ` ${name}`;

  if (decimal) {
    const paddedDecimal = decimal.padEnd(2, '0');
    const decimalInWords = numberToWords.toWords(parseInt(paddedDecimal));
    result += ` and ${decimalInWords} ${subunit}`;
  }

  return capitalizeWords(result + ' Only');
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
        setWords(inWords(result[0]?.amount,result[0]?.currency));
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
  // console.log(transaction);
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
                    <Box sx={{fontSize:'25px',fontWeight:'700',display:'flex',alignItems:'center',gap:'15px'}}>{transaction?.type==='forexPurchase' || transaction?.type==='forexTransfer' && `${getSymbolFromCurrency(transaction?.currency)} ${transaction?.amount} =>`} {getSymbolFromCurrency(transaction?.settlement)} {transaction?.settledAmount} <img src="/img/greenverified.png" style={{width:'25px'}}/></Box>
                    <Box sx={{ paddingBottom:'20px',borderBottom:'1px solid lightgrey'}}>{words}</Box>
                    <Box sx={{fontSize:'18px',fontWeight:'400',marginTop:'20px'}}>To {toMy && 'Your'}</Box>
                    <Box sx={{fontSize:'25px',fontWeight:'500',display:'flex',alignItems:'center',gap:'15px',position:'relative'}}>{toMy?'Interplanetary Bank':transaction?.type==='card'?'Netflix':`${transaction?.to?.firstName} ${transaction?.to?.lastName}`} <img src={transaction?.type==='card'?'https://cdn.vox-cdn.com/thumbor/sW5h16et1R3au8ZLVjkcAbcXNi8=/0x0:3151x2048/2000x1333/filters:focal(1575x1024:1576x1025)/cdn.vox-cdn.com/uploads/chorus_asset/file/15844974/netflixlogo.0.0.1466448626.png':"/img/IPBS.png"} style={{width:'70px',position:'absolute',right:'10px',borderRadius:transaction?.type==='card' && '20px'}}/></Box>
                    {!transaction?.type==='card'?<Box sx={{paddingBottom:'20px',borderBottom:'1px solid lightgrey'}}> A/C No. - {trimAccountNumber(transaction?.to?.accountNo)} <span style={{color:'#1979e6',cursor:'pointer'}} onClick={()=>CopyToClipboard(transaction?.to?.accountNo)}>Copy</span></Box>:<Box sx={{borderBottom:'1px solid lightgrey',paddingBottom:'30px'}}></Box>}
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
