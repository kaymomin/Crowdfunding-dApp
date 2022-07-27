const { run } = require("hardhat");

async function main() {
  const contractAddress = "0xA6A30bCc591107d932CA12a50FC616BAb5E58cdA";

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
      contract: "contracts/crowdfunding.sol:CrowdFactory",
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