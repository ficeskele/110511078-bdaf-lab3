const hre = require("hardhat");

async function main() {
  const simplesafe = await hre.ethers.getContractFactory("Simplesafe");
  const Simplesafe = await simplesafe.deploy();

  await Simplesafe.deployed();

  console.log("Deployed to:", Simplesafe.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });