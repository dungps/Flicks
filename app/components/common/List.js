import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  Image,
  TouchableHighlight,
  RefreshControl
} from "react-native";

import { API_KEY } from "../../config";

import Item from "./Item";

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
};

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: ds.cloneWithRows(["row 1", "row 2"]),
      search: ""
    };
  }

  componentWillMount() {
    let endpoint = this.props.endpoint;
    let url = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${API_KEY}`;
    if (this.state.search !== "") {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${this
        .state.search}`;
    }

    fetch(url)
      .then(resp => resp.json())
      .then(jsonResp => {
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(jsonResp.results)
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight>
        <Item item={rowData} />
      </TouchableHighlight>
    );
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );

    // return <Text>Item Not Found</Text>;
  }
}

export { List };
