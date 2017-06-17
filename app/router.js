import React, { Component } from "react";
import { Navigator } from "react-native";

import Home from "./components/Home";
import Single from "./components/Single";

export default class Router extends Component {
  renderScene(route, navigator) {
    switch (route.id) {
      case "home":
      default:
        return <Home navigator={navigator} route={route} />;
      case "single":
        return <Single navigator={navigator} route={route} />;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ id: "home" }}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}
