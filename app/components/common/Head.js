import React, { Component } from "react";

import { View, Text, TextInput, TouchableHighlight } from "react-native";

import { SearchBar } from "react-native-elements";

const styles = {
  container: {
    backgroundColor: "transparent",
    height: 50,
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
    return <SearchBar lightTheme onChangeText={this.onTextChange.bind(this)} />;
  }

  singleScreen() {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigator.push({ id: "home" });
        }}
        style={{ justifyContent: "center" }}
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
