require("babel-register");
require("babel-polyfill");
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          "quiz nasty wide soccer talent obtain sight bless bracket luggage unable avoid sad year traffic welcome jazz bracket reflect fame swim vanish guitar fuel",
          `https://rinkeby.infura.io/v3/b398f4cfc53b4f5390600438d995f1ba`
        ),
      network_id: 4,
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: "0.8.1",
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "petersburg",
    },
  },
};
