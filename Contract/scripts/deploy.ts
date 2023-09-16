import { ethers } from "hardhat";

async function main() {
  const board = await ethers.deployContract("BoardColor");

  await board.waitForDeployment();

  console.log(`Board deployed to ${board.target}`);

  const color1 = await board.getAllArray();
  // const color2 = await board.getCellColor(1, 4);

  console.log({ color1 });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
