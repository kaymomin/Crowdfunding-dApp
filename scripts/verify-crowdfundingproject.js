
const { run, ethers } = require("hardhat");
async function main() {
  const contractAddress = "0xcf092E8bDCDC1FA8B15Ebeb9D97453D498067Df1";
  const args = [
    "first title", ethers.utils.parseUnits("0.1", 18), "description", "0xdC4EfDac43475F434482e61805E0df96D2dC1DF4"
,
  ];

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
      contract: "contracts/crowdfunding.sol:CrowdfundingProject",
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
