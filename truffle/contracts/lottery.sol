pragma solidity >=0.4.22 <0.6.0;

contract Lottery{
    address public manager;
    address payable [] public players; 
     constructor() public{
        manager = msg.sender;
        
    }
    
    function enter() public payable{
        require(msg.value > 0.01 ether,"insufficient balance");
        players.push(msg.sender);
    }
    
  function getArray()public view returns(address payable [] memory){
      return(players);
      
  }  
  
  function pickWinner() public{
      uint winner = random() % players.length;
      players[winner].transfer(address(this).balance);
      players = new address payable[](0);
  }
  
  function random() private returns(uint){
      uint randomValue = uint(keccak256(abi.encodePacked(block.difficulty,now,players)));
      return randomValue;
  }
    
}