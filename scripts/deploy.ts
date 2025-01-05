import { ethers } from "hardhat";

async function main() {
  // Get the contract to deploy
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Replace 'YourContract' with the name of your contract
  const YourContract = await ethers.getContractFactory("MatatuGame");
  const contract = await YourContract.deploy();

  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
