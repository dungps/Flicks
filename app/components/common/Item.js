import React, { Component } from "react";
import { View, Text } from "react-native";

import Image from "react-native-image-progress";
import Progress from "react-native-progress";

class Item extends Component {
  setNativeProps(props) {
    this.refs["item"].setNativeProps(props);
  }

  render() {
    const { poster_path, original_title, overview } = this.props.item;

    return (
      <View
        ref="item"
        style={{ height: 200, marginBottom: 10, flexDirection: "row" }}
      >
        <Image
          indicator={Progress}
          style={{ flex: 4 }}
          source={{
            uri: `https://image.tmdb.org/t/p/original${poster_path}`
          }}
        />
        <View style={{ paddingLeft: 10, flex: 6 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            {original_title}
          </Text>
          <Text>{overview.substr(0, 400)}...</Text>
        </View>
      </View>
    );
  }
}

export default Item;
