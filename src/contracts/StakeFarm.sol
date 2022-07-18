
// // SPDX-License-Identifier: MIT
pragma solidity 0.8.1;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakeFarm {
   
    address public owner;
    IERC20 public inrcToken;
    IERC20 public usdcToken;

    // mapping(address => uint256) public stakingBalance;
    // mapping(address => bool) public hasStaked;
    // mapping(address => uint) public timeOfStakingFor;

    // address[] public stakers;

    event Staked(address by, uint256 amount);
    event Reedem(address by, uint256 amount);

    constructor(IERC20 _inrcToken, IERC20 _usdcToken) {
        inrcToken = _inrcToken;
        usdcToken = _usdcToken;
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner of the token farm can call this function");
        _;
    }

    // function getStakers() public view returns(address[] memory) {
    //     return stakers;
    // }

    function getMintingFee(uint256 _amount) public  pure returns(uint256 ) {
        return _amount/200;
    }

    //stake tokens - investor puts money into the app (deposit)
    function stakeTokens(uint256 _amount) public  {
        require(_amount > 0, "Amount cannot be 0");
        require(usdcToken.balanceOf(msg.sender) > _amount, "USDC token balance is less than expected amount");
        require(inrcToken.balanceOf(address(this)) > 80 * _amount, "INRC token balance of contract is less than expected amount");
        //transfer mock dai tokens to this contract for staking

        usdcToken.transferFrom(msg.sender, address(this), _amount);

		inrcToken.transfer( msg.sender, (80 * _amount) - getMintingFee(80 * _amount));

        // //update staking balance
        // stakingBalance[msg.sender] = stakingBalance[msg.sender] ;

        // //update time of staking
        // timeOfStakingFor[msg.sender] = block.timestamp;

        // // add user to stakers array only if they havent staked already,
        // // because later we'd want to give them only once the issued tokens
        // if (!hasStaked[msg.sender]) {
        //     stakers.push(msg.sender);0x11030f2262199597228a22ceaed24d65d532782a
        // }
        // //update staking status
        // hasStaked[msg.sender] = true;

        emit Staked(msg.sender, _amount);
    }


    //redeem tokens
    function redeemTokens(uint256 _amount) public  {
        require(_amount > 0, "Amount cannot be 0");
        require(inrcToken.balanceOf(msg.sender) > _amount, "INRC token balance  is less than expected amount");
        require(usdcToken.balanceOf(address(this)) > _amount/80, "USDC token balance of contract is less than expected amount");
        
        inrcToken.transferFrom( msg.sender, address(this) ,_amount);

        usdcToken.transfer(msg.sender, (_amount/80) - getMintingFee(_amount/80));


        emit Reedem(msg.sender, _amount);
    }

   
}