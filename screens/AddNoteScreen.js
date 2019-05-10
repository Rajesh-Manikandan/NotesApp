import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ListView,
  TextInput,
  Text,
  Keyboard,
  AsyncStorage
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Textarea } from "native-base";
export default class AddNoteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      key: "",
      autoFocus: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: "Add Note",
      headerRight: (
        <TouchableOpacity
          onPress={async () => {
            //Add Note
            params.addNote();
          }}
        >
          <Entypo
            name="save"
            size={25}
            maxLength={350}
            style={{
              color: "#fff",
              marginRight: 20
            }}
          />
        </TouchableOpacity>
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      addNote: this.addNote
    });
    this.props.navigation.addListener("willFocus", () => {
      const data = this.props.navigation.getParam("data");
      if (data) {
        this.setState({ note: data[1].toString(), key: data[0].toString() });
      }
    });
  }

  addNote = async () => {
    const { note, key } = this.state;
    console.log(note);
    try {
      if (key !== "") {
        await AsyncStorage.setItem(key, note);
      } else {
        await AsyncStorage.setItem(Date.now().toString(), note);
      }
      this.props.navigation.goBack();
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  render() {
    return (
      <Textarea
        style={styles.container}
        rowSpan={20}
        autoFocus={true}
        KeyboardType="web-search"
        onChangeText={note => this.setState({ note })}
        value={this.state.note}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontSize: 20,
    padding: 20
  }
});
