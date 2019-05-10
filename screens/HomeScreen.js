import React from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ListView,
  TextInput,
  View,
  AsyncStorage
} from "react-native";
import { LinearGradient, Font } from "expo";
import { Entypo } from "@expo/vector-icons";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Spinner
} from "native-base";

const datas = ["John", "Dae", "Jane", "John", "Dae", "Jane"];

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: [],
      loading: true
    };
  }
  static navigationOptions = {
    title: "Note App",
    headerStyle: {
      backgroundColor: "#01CBC6"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  componentWillMount() {
    this.props.navigation.addListener("willFocus", async () => {
      await AsyncStorage.getAllKeys()
        .then(async keys => {
          await AsyncStorage.multiGet(keys).then(data => {
            this.setState({
              listViewData: data
            });
          });
        })
        .catch(error => console.log(error))
        .catch(error => console.log(error));
    });
  }

  deleteRow(secId, rowId, rowMap, data) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData }, async () => {
      try {
        await AsyncStorage.removeItem(data[0].toString());
      } catch (error) {
        console.log(error);
      }
    });
  }
  addRow(note) {
    const newData = [...this.state.listViewData, note];
    this.setState({ listViewData: newData });
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.spinner}>
          <Spinner />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data => (
              <ListItem style={styles.listItem}>
                <Entypo name="text" style={styles.noteIcon} size={20} />
                <Text style={styles.noteText}> {data[1].toString()} </Text>
              </ListItem>
            )}
            renderLeftHiddenRow={data => (
              <Button
                full
                onPress={() => this.props.navigation.navigate("Add", { data })}
              >
                <Entypo active name="edit" />
              </Button>
            )}
            renderRightHiddenRow={(data, secId, rowId, rowMap) => (
              <Button
                full
                danger
                onPress={_ => this.deleteRow(secId, rowId, rowMap, data)}
              >
                <Icon active name="trash" />
              </Button>
            )}
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            this.props.navigation.navigate("Add");
          }}
        >
          <Entypo name="plus" size={20} style={styles.addButtonIcon} />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  spinner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: 200
  },
  logoText: {
    color: "#fff",
    fontSize: 25
  },
  button: {
    marginTop: 30,
    marginHorizontal: 30,
    backgroundColor: "#fff"
  },
  buttonText: {
    color: "#333"
  },
  noteIcon: {
    color: "#01CBC6",
    marginHorizontal: 5
  },
  noteText: {
    textAlign: "center"
  },
  listItem: {
    paddingVertical: 10
  },
  addButton: {
    position: "absolute",
    backgroundColor: "#01CBC6",
    bottom: 20,
    padding: 20,
    borderRadius: 50,
    alignItems: "center",
    width: 100,
    height: 80,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    bottom: 10,
    right: 10
  },
  addButtonText: {},
  addButtonIcon: {}
});
