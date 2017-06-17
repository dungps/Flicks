import React, { Component } from "react";

import { View, Text, TextInput, TouchableHighlight } from "react-native";

const styles = {
  container: {
    backgroundColor: "transparent",
    height: 60,
    paddingTop: 15,
    elevation: 2,
    position: "relative"
  }
};

class Head extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };

    this.homeScreen = this.homeScreen.bind(this);
    this.singleScreen = this.singleScreen.bind(this);
  }

  onTextChange(text) {
    this.props.onSearch(text);
    this.setState({
      text: text
    });
  }

  homeScreen() {
    return (
      <TextInput
        onChangeText={this.onTextChange.bind(this)}
        value={this.state.text}
      />
    );
  }

  singleScreen() {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigator.push({ id: "home" });
        }}
      >
        <Text>Back</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.screen === "home" ? this.homeScreen() : this.singleScreen()}
      </View>
    );
  }
}

export { Head };
