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

### Library
```bash
npm install --save-dev hardhat
npm install --save-dev @nomicfoundation/hardhat-toolbox
npm install --save @nomiclabs/hardhat-etherscan
npm install ethers mocha
npm install --save-dev @openzeppelin/contracts
npm install --save dotenv 
 ```
 * Some challenge I facing : 
The environment Library of ethers seems to be to new for my Solidity compile version and i am using Window system, which need to use "--save-dev" in order to ensure the download path was correct. Otherwise, you wil face these kind of error message. 

## Step 3：
Using the hardhat to compile these files, you can insert this command on you Terminal.
```bash
$ npx hardhat compile
 ```
 if you receive the error message said "there nothing to compile", you can insert this command on you Terminal in order to clean the data in ram.
 ```bash
$ npx hardhat clean 
 ```
