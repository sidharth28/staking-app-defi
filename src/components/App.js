import React, { Component } from "react";
import Web3 from "web3";
import USDCToken from "../abis/USDCToken.json";
import INRCToken from "../abis/INRCToken.json";
import StakeFarm from "../abis/StakeFarm.json";
import Navbar from "./Navbar";
import Main from "./Main";
import "./App.css";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const gasPrice = await window.web3.eth.getGasPrice();
    const eb = await web3.eth.getBalance(accounts[0]);
    console.log("eb", eb.toString());

    this.setState({
      account: accounts[0],
      gasPrice: gasPrice,
    });

    const networkId = await web3.eth.net.getId();

    // Load DaiToken
    const daiTokenData = USDCToken.networks[networkId];
    if (daiTokenData) {
      const daiToken = new web3.eth.Contract(
        USDCToken.abi,
        daiTokenData.address
      );
      this.setState({ daiToken });
      let daiTokenBalance = await daiToken.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ daiTokenBalance: daiTokenBalance.toString() });
    } else {
      window.alert(
        "USDC Token contract not deployed to detected network.  Connet to (rinkeby)"
      );
    }

    // Load DappToken
    const dappTokenData = INRCToken.networks[networkId];
    if (dappTokenData) {
      const dappToken = new web3.eth.Contract(
        INRCToken.abi,
        dappTokenData.address
      );
      this.setState({ dappToken });
      let dappTokenBalance = await dappToken.methods
        .balanceOf(this.state.account)
        .call();
      console.log("eb1", eb);
      this.setState({
        dappTokenBalance: dappTokenBalance.toString(),
        eb: eb,
      });
    } else {
      window.alert(
        "INRC Token contract not deployed to detected network. Connet to (rinkeby)"
      );
    }

    // Load TokenFarm
    const tokenFarmData = StakeFarm.networks[networkId];
    if (tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(
        StakeFarm.abi,
        tokenFarmData.address
      );
      this.setState({ tokenFarm });

      // let stakingBalance = await tokenFarm.methods
      //   .stakingBalance(this.state.account)
      //   .call();
      // this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
      window.alert(
        "StakeFarm contract not deployed to detected network. Connet to  (rinkeby)"
      );
    }

    this.setState({ loading: false });
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  stakeTokens = async (amount) => {
    console.log("this.state.gasPrice11", this.state.gasPrice);
    this.setState({ loading: true });
    this.state.daiToken.methods
      .approve(this.state.tokenFarm._address, amount)
      .send({
        from: this.state.account,
        gasPrice: this.state.gasPrice * 4,
      })
      .on("receipt", (hash) => {
        this.state.tokenFarm.methods
          .stakeTokens(amount)
          .send({
            from: this.state.account,
            gasPrice: this.state.gasPrice * 4,
          })
          .on("receipt", (hash) => {
            this.setState({ loading: false });
            this.loadBlockchainData();
          });
      });
  };

  unstakeTokens = (amount) => {
    this.setState({ loading: true });

    this.state.dappToken.methods
      .approve(this.state.tokenFarm._address, amount)
      .send({
        from: this.state.account,
        gasPrice: this.state.gasPrice * 4,
      })
      // .on("transactionHash", function (hash) {
      //   // this.setState({ pw: "false" });
      // })
      .on("receipt", (hash) => {
        this.state.tokenFarm.methods
          .redeemTokens(amount)
          .send({
            from: this.state.account,
            gasPrice: this.state.gasPrice * 4,
          })
          .on("receipt", (hash) => {
            this.setState({ loading: false });
            this.loadBlockchainData();
          });
      });
    // this.state.tokenFarm.methods
    //   .redeemTokens(amount)
    //   .send({ from: this.state.account, gasPrice: this.state.gasPrice * 4 })
    //   .on("transactionHash", (hash) => {
    //     this.setState({ loading: false });
    //   });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      daiToken: {},
      dappToken: {},
      tokenFarm: {},
      daiTokenBalance: "0",
      dappTokenBalance: "0",
      stakingBalance: "0",
      loading: false,
      eb: "0",
      pw: "",
    };
  }

  render() {
    let content;
    if (this.state.loading) {
      content = (
        <div
          id="loader"
          className="text-center"
          style={{ "font-size": "50px", padding: "100px" }}
        >
          <h3>Please wait !!!</h3>
          <h4>Waiting for transaction to confirm !!!</h4>
        </div>
      );
    } else {
      content = (
        <Main
          daiTokenBalance={this.state.daiTokenBalance}
          dappTokenBalance={this.state.dappTokenBalance}
          stakingBalance={this.state.stakingBalance}
          stakeTokens={this.stakeTokens}
          unstakeTokens={this.unstakeTokens}
          eb={this.state.eb}
          pw={this.state.pw}
        />
      );
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px" }}
            >
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>

                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
