# 110511078-bdaf-lab3

### Requirements
- Create a simple safe contract that allows everyone to store funds in the contract.
- The contract should at least includes the following two functions:
    
    ```bash
    function deposit(address token, uint256 amount)
    
    function withdraw(address token, uint256 amount)
    ```
    
- `deposit` is expected to take away users' funds as specified.
- `withdraw` is expected to return users' funds as specified.
- Construct **tests** with Hardhat (You will have to create your own ERC20)
- **Deploy** the contract with Hardhat
- **Verify** the contract with Hardhat on the testnet
---
# The implement process ：

## Step 1：
you have to write a contract about deposit and withdraw with Solidity.

The file was named Simplesafe in Contracts.

## Step 2：
install Hardhat environment by some useful link：https://hardhat.org/tutorial/creating-a-new-hardhat-project

```bash
npm install --save-dev hardhat
npm install --save-dev @nomicfoundation/hardhat-toolbox
npm install --save @nomiclabs/hardhat-etherscan
npm install ethers mocha
npm install --save-dev @openzeppelin/contracts
npm install --save dotenv 
 ```
