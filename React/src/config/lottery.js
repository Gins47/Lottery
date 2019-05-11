import web3 from '../web3'
import contract from '../contracts/Lottery.json'
let address = "0xbfEcCD8BC4eBD40f4F2C8fFd496EF962A9DcC2BB";
let abi = contract.abi;
let contractInstance = new web3.eth.Contract(abi,address)

export default contractInstance;

