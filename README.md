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
 
## Step 4：
Create a new test file, which means you have to use javascript to simulate all the case the contract running though.

The propose of this project is to store the finance, therefore, you have to build a simulation version of coin; that is, The file was named MyToken in Contracts.


The file was named testice in test. Then you can insert this command on you Terminal.
```bash
$ npx hardhat test
 ```
If you receive the error message, you can firstly check config file.

## Step 5：
You can put these contracts on chain.
Here i use the goerli test chain.  Then you can insert this command on you Terminal.
```bash
$ npx hardhat run scripts/deploy.js --network goerli
 ```

## Step 6：
Once you get the address of the contract, by executing deploy.js. Then you can insert this command on you Terminal in order to verify.
```bash
$ npx hardhat verify --network goerli 0x90393769c0B14AF18796e66a8A3bc110D13A32aB
 ```
* 0x90393769c0B14AF18796e66a8A3bc110D13A32aB is the address of my contracts.



