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
      dataSource: ds.cloneWithRows([]),
      search: "",
      currentPage: 1,
      isFirstPage: true,
      refreshing: false
    };
  }

  componentWillMount() {
    this.getLatestData();
  }

  componentWillReceiveProps(props) {
    if (props.search !== this.state.search) {
      this.setState({
        isLoading: true,
        isFirstPage: true,
        currentPage: 1,
        search: props.search,
        endpoint: props.endpoint,
        dataSource: ds.cloneWithRows([])
      });

      console.log(this.state);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.search !== this.state.search) {
      this.setState(
        {
          isLoading: true,
          isFirstPage: true,
          currentPage: 1,
          search: nextProps.search,
          endpoint: nextProps.endpoint,
          dataSource: ds.cloneWithRows([])
        },
        this.getLatestData
      );
    }

    return true;
  }

  getLatestData() {
    if (this.state.isFirstPage) {
      _postData = [];
    }

    const currentPage = this.state.currentPage;
    const endpoint = this.props.endpoint;
    let url = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${API_KEY}&page=${currentPage}`;
    if (this.state.search !== "") {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURI(
        this.state.search
      )}&page=${currentPage}`;
    }

    return fetch(url)
      .then(resp => resp.json())
      .then(jsonResp => {
        _postData = _postData.concat(jsonResp.results);
        this.setState({
          isLoading: false,
          isFirstPage: false,
          dataSource: this.state.dataSource.cloneWithRows(_postData),
          currentPage: currentPage + 1
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  _onEndReached(rowData) {
    this.getLatestData();
  }

  _onRefresh() {
    this.setState(
      {
        isFirstPage: true,
        currentPage: 1,
        refreshing: true
      },
      () => {
        this.getLatestData().then(() => {
          this.setState({
            refreshing: false
          });
        });
      }
    );
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        postid={rowData.id}
        onPress={() => {
          this.props.navigator.push({
            id: "single",
            data: rowData
          });
        }}
        onLongPress={() => {
          this.props.navigator.push({
            id: "single",
            data: rowData
          });
        }}
      >
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
        renderRow={this.renderRow.bind(this)}
        onEndReached={this._onEndReached.bind(this)}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        style={[
          {
            backgroundColor: "#fff"
          },
          this.props.style
        ]}
      />
    );

    // return <Text>Item Not Found</Text>;
  }
}

export { List };
