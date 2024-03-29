import React, { Component } from "react";
import dai from "../dai.png";

class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table  text-muted text-center">
          <thead>
            <tr>
              <th> USDC</th>
              <th>INRC</th>
              <th>ETH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {window.web3.utils.fromWei(this.props.daiTokenBalance, "Ether")}{" "}
                USDC
              </td>
              <td>
                {window.web3.utils.fromWei(
                  this.props.dappTokenBalance,
                  "Ether"
                )}{" "}
                INRC
              </td>
              <td> {window.web3.utils.fromWei(this.props.eb, "Ether")} </td>
            </tr>
          </tbody>
        </table>
        <div className="card mb-4">
          <div className="card-body">
            <form
              className="mb-3"
              onSubmit={(event) => {
                event.preventDefault();
                let amount;
                amount = this.input1.value.toString();
                amount = window.web3.utils.toWei(amount, "Ether");
                this.props.stakeTokens(amount);
              }}
            >
              <div>
                <label className="float-left">
                  <b>Stake </b>
                </label>
                {/* <span className="float-right text-muted">
                  Balance:{" "}
                  {window.web3.utils.fromWei(
                    this.props.daiTokenBalance,
                    "Ether"
                  )}
                </span> */}
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input1) => {
                    this.input1 = input1;
                  }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    {/* <img src={dai} height="32" alt="" /> */}
                    &nbsp;&nbsp;&nbsp; USDC
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-danger btn-block btn-lg">
                Stake
              </button>
            </form>
            {/* <button
              type="submit"
              className="btn btn-link btn-block btn-sm"
              onClick={(event) => {
                event.preventDefault();
                this.props.unstakeTokens();
              }}
            >
              UN-STAKE...
            </button> */}
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <form
              className="mb-3"
              onSubmit={(event) => {
                event.preventDefault();
                let amount;
                amount = this.input.value.toString();
                amount = window.web3.utils.toWei(amount, "Ether");
                this.props.unstakeTokens(amount);
              }}
            >
              <div>
                <label className="float-left">
                  <b>Redeem </b>
                </label>
                {/* <span className="float-right text-muted">
                  Balance:{" "}
                  {window.web3.utils.fromWei(
                    this.props.daiTokenBalance,
                    "Ether"
                  )}
                </span> */}
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => {
                    this.input = input;
                  }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    {/* <img src={dai} height="32" alt="" /> */}
                    &nbsp;&nbsp;&nbsp; INRC
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-danger btn-block btn-lg">
                Reedem
              </button>
            </form>
            {/* <button
              type="submit"
              className="btn btn-link btn-block btn-sm"
              onClick={(event) => {
                event.preventDefault();
                this.props.unstakeTokens();
              }}
            >
              UN-STAKE...
            </button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
