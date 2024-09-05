import { ethers } from "hardhat";

async function main() {
  const voterRegistration = await ethers.deployContract("VoterRegistration");
  await voterRegistration.waitForDeployment();

  // Deploy voting smart contract
  const voting = await ethers.deployContract("Voting", [
    voterRegistration.target,
  ]);
  await voting.waitForDeployment();

  // Deploy vote tally smart contract
  const voteTally = await ethers.deployContract("VoteTally", [voting.target]);
  await voteTally.waitForDeployment();

  console.log(
    "VoterRegistration Contract Deployed at " + voterRegistration.target
  );
  console.log("Voting Contract Deployed at " + voting.target);
  console.log("VoteTally Contract Deployed at " + voteTally.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
