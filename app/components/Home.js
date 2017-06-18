import React, { Component } from "react";
import { View, Text } from "react-native";
import { Tabs, Tab, Icon } from "react-native-elements";

import { List, Head } from "./common";

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
      selectedTab: "now_playing",
      searchText: ""
    };
  }

  onSearch(text) {
    this.setState({
      searchText: text
    });
  }

  render() {
    const { selectedTab } = this.state;
    return (
      <View style={styles.container}>
        <Head screen="home" onSearch={this.onSearch.bind(this)} />
        <List
          endpoint="now_playing"
          search={this.state.searchText}
          navigator={this.props.navigator}
          route={this.props.route}
        />
        {/*<Tabs>
          <Tab
            selected={selectedTab === "now_playing"}
            onPress={() => this.setState({ selectedTab: "now_playing" })}
            title="Now Playing"
            renderIcon={() => <Icon type="font-awesome" name="film" />}
          >
            <List
              endpoint="now_playing"
              search={this.state.searchText}
              navigator={this.props.navigator}
              route={this.props.route}
            />
          </Tab>
          <Tab
            selected={selectedTab === "top_rated"}
            onPress={() => this.setState({ selectedTab: "top_rated" })}
            title="Top Rated"
            renderIcon={() => <Icon type="font-awesome" name="star" />}
          >
            <List
              endpoint="top_rated"
              search={this.state.searchText}
              navigator={this.props.navigator}
              route={this.props.route}
            />
          </Tab>
        </Tabs>*/}
      </View>
    );

    // return (
    //   <View style={styles.container}>
    //     <Head
    //       screen="home"
    //       navigator={this.props.navigator}
    //       route={this.props.route}
    //       onSearch={this.onSearch}
    //     />
    //     <List
    //       endpoint={this.state.page}
    //       navigator={this.props.navigator}
    //       route={this.props.route}
    //       search={this.state.searchText}
    //     />
    //     <Tab
    //       selected={this.state.page}
    //       onSelect={el => this.setState({ page: el.props.name })}
    //       style={styles.tabStyle}
    //       selectedStyle={styles.tabSelectedStyle}
    //     >
    //       <Text name="now_playing">Now Playing</Text>
    //       <Text name="top_rated">Top Rated</Text>
    //     </Tab>
    //   </View>
    // );
  }
}

export default Home;
