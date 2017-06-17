import React, { Component } from "react";
import { View, NetInfo } from "react-native";

import ConnectFail from "./components/ConnectFail";
import Router from "./router";

const configs = require("./config");

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: false,
      configs: configs,
      data: []
    };
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({
        isConnected: isConnected
      });
    });

    NetInfo.addEventListener("change", reach => {
      if (
        reach.toLocaleLowerCase() !== "none" &&
        reach.toLocaleLowerCase() !== "unknown" &&
        reach.toLocaleLowerCase() !== "bluetooth"
      ) {
        this.setState({
          isConnected: true
        });
      } else {
        this.setState({
          isConnected: false
        });
      }
    });
  }

  render() {
    if (!this.state.isConnected) {
      return <ConnectFail />;
    }

    return <Router />;
  }
}
