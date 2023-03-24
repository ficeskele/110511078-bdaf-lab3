
const { expect } = require("chai");
const { ethers } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Token contract", function () {

  async function deployTokenFixture() {

    const Token = await ethers.getContractFactory("myToken");
    const [owner, addr_first, addr_Second] = await ethers.getSigners();
    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    return { Token, hardhatToken, owner, addr_first, addr_Second };
  }

  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { hardhatToken, owner, addr_first, addr_Second } = await loadFixture(
        deployTokenFixture
      );
      // Transfer 50 tokens from owner to addr_first
      await expect(
        hardhatToken.transfer(addr_first.address, 50)
      ).to.changeTokenBalances(hardhatToken, [owner, addr_first], [-50, 50]);

      // Transfer 50 tokens from addr_first to addr_Second
      // We use .connect(signer) to send a transaction from another account
      await expect(
        hardhatToken.connect(addr_first).transfer(addr_Second.address, 50)
      ).to.changeTokenBalances(hardhatToken, [addr_first, addr_Second], [-50, 50]);
    });

    it("Should emit Transfer events", async function () {
      const { hardhatToken, owner, addr_first, addr_Second } = await loadFixture(
        deployTokenFixture
      );

      // Transfer 50 tokens from owner to addr_first
      await expect(hardhatToken.transfer(addr_first.address, 50))
        .to.emit(hardhatToken, "Transfer")
        .withArgs(owner.address, addr_first.address, 50);

      // Transfer 50 tokens from addr_first to addr_Second
      // We use .connect(signer) to send a transaction from another account
      await expect(hardhatToken.connect(addr_first).transfer(addr_Second.address, 50))
        .to.emit(hardhatToken, "Transfer")
        .withArgs(addr_first.address, addr_Second.address, 50);
    });

    it("fail if sender doesn't have enough tokens", async function () {
      const { hardhatToken, owner, addr_first } = await loadFixture(
        deployTokenFixture
      );
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      
      // Try to send 1 token from addr_first (0 tokens) to owner.
      // Owner balance shouldn't have changed.
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });
});



describe("Simplesafe contract", function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deployBankFixture() {
    // Get the ContractFactory and Signers here.
    const Simplesafe = await ethers.getContractFactory("Simplesafe");
    const [Bank_owner, addr_first, addr_Second] = await ethers.getSigners();

    // To deploy our contract, we have to call Token.deploy() and await
    // its deployed() method, which happens once its transaction has been
    // mined.
    const hardhatBank = await Simplesafe.deploy();

    await hardhatBank.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { Simplesafe, hardhatBank, Bank_owner, addr_first, addr_Second };
  } 

  async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const Token = await ethers.getContractFactory("myToken");
    const [Token_owner, addr_first, addr_Second] = await ethers.getSigners();

    // To deploy our contract, we have to call Token.deploy() and await
    // its deployed() method, which happens once its transaction has been
    // mined.
    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { Token, hardhatToken, Token_owner, addr_first, addr_Second };
  }


  // You can nest describe calls to create subsections.
  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      const { hardhatBank, Bank_owner } = await loadFixture(deployBankFixture);
      expect(await hardhatBank.owner()).to.equal(Bank_owner.address);
    });

  });


  describe("Transactions", function () {

    
    it("Should allow valid deposit and withdraw", async function () {

      const { hardhatBank, Bank_owner} = await loadFixture(
        deployBankFixture
      );

      const { hardhatToken, Token_owner, addr_first, addr_Second } = await loadFixture(
        deployTokenFixture
      );

      expect(
        (await hardhatBank.balanceOf(addr_first.address)).toString()
      ).to.equal("0");

      
      // Transfer 100 tokens from owner to addr_first
      await expect(
        hardhatToken.transfer(addr_first.address, 100)
      ).to.changeTokenBalances(hardhatToken, [Token_owner, addr_first], [-100, 100]);
      
      
      // addr_first deposit 50 tokens to bank/*
      const erc20WithSigner = hardhatToken.connect(addr_first);
      const approveTx = await erc20WithSigner.approve(hardhatBank.address, "100000000");
      await approveTx.wait();
      
      const BankWithSigner = hardhatBank.connect(addr_first);
      const depositTx = await BankWithSigner.deposit(hardhatToken.address, 50);
      await depositTx.wait();

      // 50 tokens in bank
      expect(
        (await hardhatBank.connect(addr_first).balanceOf(hardhatToken.address)).toString()
      ).to.equal("50");

      // 50 tokens in addr_first
      expect(
        (await hardhatToken.connect(addr_first).balanceOf(addr_first.address)).toString()
      ).to.equal("50");     
      
      // addr_first withdraw 50 tokens from bank
      const withdrawTx = await BankWithSigner.withdraw(hardhatToken.address, 50);
      await withdrawTx.wait();

      // 0 tokens in bank
      expect(
        (await hardhatBank.connect(addr_first).balanceOf(hardhatToken.address)).toString()
      ).to.equal("0");

      // 100 tokens in addr_first
      expect(
        (await hardhatToken.connect(addr_first).balanceOf(addr_first.address)).toString()
      ).to.equal("100");     
    });
    
    it('Should forbidden invalid deposit and withdraw', async function() {
      const { hardhatBank, Bank_owner} = await loadFixture(
        deployBankFixture
      );

      const { hardhatToken, Token_owner, addr_first, addr_Second } = await loadFixture(
        deployTokenFixture
      );

      // Transfer 100 tokens from owner to addr_first
      await expect(
        hardhatToken.transfer(addr_first.address, 100)
      ).to.changeTokenBalances(hardhatToken, [Token_owner, addr_first], [-100, 100]);
      
      
      const erc20WithSigner = hardhatToken.connect(addr_first);
      const approveTx = await erc20WithSigner.approve(hardhatBank.address, "100000000");
      await approveTx.wait();
      
      // addr_first try to deposit 800 tokens to bank
      const BankWithSigner = hardhatBank.connect(addr_first);
      let err=""
      try{
        await BankWithSigner.deposit(hardhatToken.address, 800);
      }
      catch(e){
        err = e.message;
      }
      expect(err).to.equal("VM Exception while processing transaction: reverted with reason string 'ERC20: transfer amount exceeds balance'");

      // should be 0 tokens in bank
      expect(
        (await hardhatBank.connect(addr_first).balanceOf(hardhatToken.address)).toString()
      ).to.equal("0");

      // should be 100 tokens in addr_first
      expect(
        (await hardhatToken.connect(addr_first).balanceOf(addr_first.address)).toString()
      ).to.equal("100");     
      
      // addr_first try to withdraw 50 tokens from bank
      try{
        await BankWithSigner.withdraw(hardhatToken.address, 50);
      }
      catch(e){
        err = e.message;
      }
      expect(err).to.equal("VM Exception while processing transaction: reverted with reason string 'Run out of your money'");
      // 0 tokens in bank
      expect(
        (await hardhatBank.connect(addr_first).balanceOf(hardhatToken.address)).toString()
      ).to.equal("0");

      // 100 tokens in addr_first
      expect(
        (await hardhatToken.connect(addr_first).balanceOf(addr_first.address)).toString()
      ).to.equal("100");   

    });
  });
});
