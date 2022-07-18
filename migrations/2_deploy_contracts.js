const INRCToken = artifacts.require("INRCToken");
const USDCToken = artifacts.require("USDCToken");
const StakeFarm = artifacts.require("StakeFarm");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(INRCToken, "1000000000000000000000000");
  const inrcToken = await INRCToken.deployed();

  await deployer.deploy(USDCToken, "1000000000000000000000000");
  const usdcToken = await USDCToken.deployed();

  await deployer.deploy(StakeFarm, inrcToken.address, usdcToken.address);
  const stakeFarm = await StakeFarm.deployed();

  await inrcToken.transfer(stakeFarm.address, "1000000000000000000000000");

  await usdcToken.transfer(
    "0xC829BBB89e49725a52Ad7e30e5ffc827d98d6C73",
    "1000000000000000000000000"
  );
};
