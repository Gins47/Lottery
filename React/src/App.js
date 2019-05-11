import React,{Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import web3 from './web3'
import lottery from './config/lottery'

class App extends Component {
   
  constructor(porps){
    super(porps)
    this.state = {
      manager:'',
      players:[],
      balance:'',
      value: '',
      message:''
    }
  }
  
  async componentDidMount() {

    const manager = await lottery.methods.manager().call();
    let players = await lottery.methods.getArray().call();
    let balance = await web3.eth.getBalance(lottery.options.address)
    console.log("Manager == ",manager);
    this.setState({manager,players,balance})

  }
  

onSubmit= async(event)=>{
  event.preventDefault();
  const accounts = await  web3.eth.getAccounts();
  this.setState({message:"Your transaction is getting processed"})
  console.log("VALUE == ",typeof(this.state.value))
    lottery.methods.enter().send({from:accounts[1],value:web3.utils.toWei('2','ether')}).on('transactionHash', (hash) => {
      console.log(hash)
    })
    .on('receipt', (receipt) => {
    console.log(receipt)
    })
    .on('error', console.error);
    this.setState({message:"Transaction is Success "})
    // console.log("Transaction Hash == ",transactionHash)
}


onClick = async(event)=>{
  
  event.preventDefault();
  const accounts = await  web3.eth.getAccounts();
  
  this.setState({message:"Please wait while"})
  lottery.methods.pickWinner().send({from:accounts[0],gas:470000}).on('transactionHash', (hash) => {
    console.log(hash)
  })
  .on('receipt', (receipt) => {
  console.log(receipt)
  })
  .on('error', console.error);
  this.setState({message:"Winner is Picked!!!"})

  
  this.setState({message:"Winner is Picked "})
 
}

  render(){
      console.log("Lottery Address === ",lottery.address)
 
   
    return (
     <div> <h2>Lottery Contact</h2>
     <p>
       This contract is managed by {this.state.manager}.There are currently {this.state.players.length} people participating for {web3.utils.fromWei(this.state.balance,'ether')} Ether.
       </p>
       <hr />
       <form onSubmit={this.onSubmit}>
         <h4> Try your Luck today</h4>
         <div>
         <label> Amount of Ether</label>
         <input
         value={this.state.value}
         onChange={event=>this.setState({value:event.target.value})} />
          </div>
          <div>
            <button>Enter</button>
          </div>
       </form>
       <hr />
       <h4> Pick the Winner!!!!</h4>
       <button onClick={this.onClick}>Pick Winner</button>
       <hr />
       <h4>{this.state.message}</h4>
     </div>
    );
  }

}

export default App;
