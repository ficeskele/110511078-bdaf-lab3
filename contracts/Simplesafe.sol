// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Simplesafe {
    mapping(address => mapping(address => uint256)) public balances;
    address payable public owner;


    constructor() payable{
        owner = payable (msg.sender);
    }

    function deposit(address token, uint256 amount) public {
        require(amount > 0, "Deposit amount must be greater than 0");
        require(token != address(0), "Token address must be valid");

        // Transfer the tokens from the user to the contract
        
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        
        // Add the deposited amount to the user's balance
        balances[msg.sender][token] += amount;
    }

    function withdraw(address token, uint256 amount) public {
        require(amount > 0, "Withdrawal amount must be greater than 0");
        require(balances[msg.sender][token] >= amount, "Run out of your money");
        require(token != address(0), "Token address must be valid");

        // Subtract the withdrawn amount from the user's balance
        balances[msg.sender][token] -= amount;

        // Transfer the tokens from the contract to the user
        
        IERC20(token).transfer(msg.sender, amount);
       
    }

    function balanceOf(address token) public view returns (uint256) {
        return balances[msg.sender][token];
    }
}
