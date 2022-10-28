import { ethers } from "hardhat";

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const deployerBalance = await deployer.getBalance();

  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", deployerBalance);

  const Implementation = await ethers.getContractFactory("ERC721Implementation");
  const implementation = await Implementation.deploy();

  await implementation.deployed();

  console.log(`ERC721Implementation deployed to ${implementation.address}`);

  const Factory = await ethers.getContractFactory("ERC721CloneFactory");
  const factory = await Factory.deploy(implementation.address);

  await factory.deployed();

  console.log(`ERC721Factory deployed to ${factory.address}`);

  const newDeployerBalance = await deployer.getBalance();
  console.log("Account balance:", newDeployerBalance);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
