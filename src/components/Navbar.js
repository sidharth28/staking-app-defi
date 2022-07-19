import React, { Component } from "react";
import farmer from "../farmer.png";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow">
        <a className="nav-item text-nowrap d-none d-sm-none d-sm-block">
          <h4 style={{ color: "white" }}> Wallet Address : </h4>{" "}
          <h5 style={{ color: "white" }} id="account">
            {this.props.account}
          </h5>
        </a>

        <ul className="navbar-nav px-3">
          <li className="navbar-brand col-sm-3 col-md-2 mr-0">
            &nbsp; <b> Staking App </b>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
