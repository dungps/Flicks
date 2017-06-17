import React, { Component } from "react";
import { View, Image, Text } from "react-native";

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
          style={{ flex: 4 }}
          source={{
            uri: `https://image.tmdb.org/t/p/original${poster_path}`
          }}
        />
        <View style={{ paddingLeft: 10, flex: 6 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 15 }}>
            {original_title}
          </Text>
          <Text>{overview}</Text>
        </View>
      </View>
    );
  }
}

export default Item;
