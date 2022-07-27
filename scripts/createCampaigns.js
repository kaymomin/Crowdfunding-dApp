const { ethers } = require("hardhat");

async function main() {
const contract = await ethers.getContractAt("CrowdFactory","0xA6A30bCc591107d932CA12a50FC616BAb5E58cdA")
await contract.createProject("first title", ethers.utils.parseUnits("0.1", 18), "description", "0xdC4EfDac43475F434482e61805E0df96D2dC1DF4")

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });