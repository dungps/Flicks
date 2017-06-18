import React, { Component } from "react";
import { Navigator } from "react-native";

import Home from "./components/Home";
import Single from "./components/Single";
// import RateScreen from "./components/RateScreen";

export default class Router extends Component {
  SceneConfigs(router, routStack) {
    switch (router.id) {
      case "home":
      default:
        return Navigator.SceneConfigs.PushFromLeft;
      case "rate":
      case "single":
        return Navigator.SceneConfigs.PushFromRight;
    }
  }

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
        configureScene={this.SceneConfigs.bind(this)}
      />
    );
  }
}
