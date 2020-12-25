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

  static navigationOptions = ({ navigation }) => {

    return {

      headerTitle: () =>
        <View style={{ padding: 0, flex: 1, justifyContent: 'center', margin: 0, height: 50 }}>
          <Text style={{ fontSize: 20, color: 'black', fontWeight: "bold", textAlign: 'center' }}>
            React Native SeriesApp
          </Text>
        </View>
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

  imageserie: {
    width: width / 3,
    height: width / 3,
    resizeMode: 'cover',
    borderRadius: 5
  },
  divseries: {
    width: width - 10,
    backgroundColor: '#1a1d29',
    margin: 5,
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#434550'
  },
  shadows: {
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
  },
  textName: {
    width: ((width / 3) * 2) - 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "white"
  },
  textNetwork: {
    color: "red",
    fontSize: 22
  },
  textStatus: {
    fontSize: 18,
    color: 'white'
  },
  headerseries: {
    width: width,
    height: 50,
    backgroundColor: "#c2191c",
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: "bold"
  },
  logoseries: {
    height: 45,
    width: width / 3,
    resizeMode: 'contain'
  }

});

export default App;