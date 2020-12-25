import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity

} from 'react-native';

var { height, width } = Dimensions.get('window');
const baseUrl = 'https://www.episodate.com/';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSeries: []
    }
  }

  componentDidMount() {

    return fetch(baseUrl + 'api/most-popular/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSeries: responseJson
        });

      })
      .catch((error) => {
        console.error(error);
      })

  }

  render() {

    return (
      <View style={{ flex: 1, backgroundColor: '#090e22' }}>
        <FlatList
          data={this.state.dataSeries.tv_shows}
          extraData={this.state}
          // keyExtractor={this._keyExtractor}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={this._renderItem}
        />
      </View>
    );

  }

  _renderItem = ({ item }) => {

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate("Details", { "serie": item })}>
        <View style={[styles.divseries, styles.shadows]}>
          <Image
            style={styles.imageserie}
            source={{ uri: item.image_thumbnail_path }}
          />
          <View style={{ padding: 5 }}>
            <Text style={styles.textName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.textNetwork}>
              {item.network}
            </Text>
            <Text style={styles.textStatus}>
              {item.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

    );
  }

}

const styles = StyleSheet.create({

});

export default App;