import React, { Component } from "react";
import { View, Text } from "react-native";

import { Head, List, Tab } from "./common";

const styles = {
  container: {
    flex: 1
  },
  tabStyle: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff"
  },
  tabSelectedStyle: {
    color: "red"
  }
};

class Home extends Component {
  constructor() {
    super();

    this.state = {
      page: "now_playing",
      searchText: ""
    };
  }

  onSearch(text) {
    this.setState({
      searchText: text
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Head
          screen="home"
          navigator={this.props.navigator}
          route={this.props.route}
          onSearch={this.onSearch}
        />
        <List
          endpoint={this.state.page}
          navigator={this.props.navigator}
          route={this.props.route}
          search={this.state.searchText}
        />
        <Tab
          selected={this.state.page}
          onSelect={el => this.setState({ page: el.props.name })}
          style={styles.tabStyle}
          selectedStyle={styles.tabSelectedStyle}
        >
          <Text name="now_playing">Now Playing</Text>
          <Text name="top_rated">Top Rated</Text>
        </Tab>
      </View>
    );
  }
}

export default Home;
