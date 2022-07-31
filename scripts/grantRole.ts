// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main(): Promise<void> {
  // Hardhat always runs the compile task when running scripts through it.
  // If this runs in a standalone fashion you may want to call compile manually
  // to make sure everything is compiled
  // await run("compile");
  // We get the contract to deploy
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  const harpoon = await ethers.getContractFactory("Harpoon");
  const contract = await harpoon.attach("0x334fc6F0AEeAE92B17D2123dCe35c63160c6FC45");

  console.log(`Harpoon address: ${contract.address}`);

  const admin = await contract.HEALER_ROLE();

  const tx = await contract.grantRole(admin, "0xac87f14f4C22ab3B11e1aCe5D1a956BF27bF2644"  )
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
