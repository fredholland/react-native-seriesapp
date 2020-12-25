import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    StyleSheet,
    ScrollView
} from 'react-native';

var { height, width } = Dimensions.get('window');
const baseUrl = 'https://www.episodate.com/';

export default class DetailsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSerie: {}
        }
    }

    static navigationOptions = () => {

    }

    componentDidMount() {

        const serie = this.props.navigation.getParam('serie')

        return fetch(baseUrl + 'api/show-details?q=' + serie.id)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSerie: responseJson
                });

            })
            .catch((error) => {
                console.error(error);
            })

    }

    render() {

        const serie = this.state.dataSerie.tvShow;

        if (serie)
            return (
                <ScrollView style={{ flex: 1, backgroundColor: '#1a1d29' }}>
                    <View>
                        <Image
                            style={{ width: width, height: 400 }}
                            source={{ uri: serie.image_thumbnail_path }}
                        />
                        <View style={{ padding: 10 }}>
                            <Text style={styles.textName}>{serie.name}</Text>
                            <Text style={styles.textNetwork}>{serie.network}</Text>
                            <Text style={styles.textStatus}>{serie.status}</Text>
                            <Text style={styles.textDescription}>{serie.description}</Text>
                        </View>
                    </View>
                </ScrollView>
            );
        else
            return null;
    }

}

const styles = StyleSheet.create({

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
    textDescription: {
        fontSize: 18,
        color: 'white'
    },
})