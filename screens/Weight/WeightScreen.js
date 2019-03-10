import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Icon } from "react-native-elements";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from "react-native";
import {
  Container,
  Button as NativeBaseButton,
  Fab,
  View as NativeBaseView
} from "native-base";
import { WebBrowser } from "expo";
import {
  SaveWeight,
  GetWeightArray,
  ClearAllWeights
} from "../../utils/AsyncStorage";
import window from "../../constants/Layout";
import WeightDataListNativeElements from "./WeightDataListNativeElements";
import AddOrModifyWeight from "./AddOrModifyWeight";
import ProgressGauge from "./ProgressGauge/ProgressGauge";

export default class WeightScreen extends React.Component {
  static navigationOptions = {
    title: "Weight"
  };

  constructor(props) {
    super(props);
    this.state = {
      weightData: [],
      showEnterWeightComponent: false
    };
    this.handlePlusIconPress = this.handlePlusIconPress.bind(this);
    this.getAllWeights = this.getAllWeights.bind(this);
    this.closeEnterWeightWindow = this.closeEnterWeightWindow.bind(this);
    this.updateListNewOrModified = this.updateListNewOrModified.bind(this);
  }

  componentDidMount() {
    this.getAllWeights();
  }

  async handlePlusIconPress() {}

  async getAllWeights() {
    const weightData = (await GetWeightArray()).reverse();
    this.setState({ weightData });
  }

  updateListNewOrModified(newWeight, editChosenWeight = null) {
    const weight = parseFloat(newWeight);
    const templist = this.state.weightData;
    if (editChosenWeight) {
      const foundWeight = templist.find(
        weight => weight.time == editChosenWeight.time
      );
      foundWeight.weight = weight;
    } else {
      console.log("IM IN ELSE OK!!!");
      const time = new Date().getTime();
      templist.unshift({ time, weight });
    }

    this.setState(
      {
        weightData: templist,
        showEnterWeightComponent: false
      },
      this.getAllWeights
    );
  }

  closeEnterWeightWindow() {
    this.setState({ showEnterWeightComponent: false });
  }

  lol() {
    console.log("JEEEEE");
  }

  render() {
    return (
      <ScrollView style={{flex:1}}>
        <Grid>
          <Row size={50} style={{ }}>
            <ProgressGauge />
          </Row>

          <Row size={50} style={{}}>
            <AddOrModifyWeight
              showEnterWeightComponent={this.state.showEnterWeightComponent}
              closeEnterWeightWindow={this.closeEnterWeightWindow}
              updateListNewOrModified={this.updateListNewOrModified}
              chosenWeightItem={this.state.chosenWeightItem}
            />
            {/* FOR TESTING */}
            {/* <Button title="Clear data" onPress={ClearAllWeights} />
          <Button title="Get Weights" onPress={this.getAllWeights} /> */}
            {/* FOR TESTING */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                // alignSelf: "auto",
                marginTop: 1,
                // alignContent: "space-around",
                justifyContent: "space-between"
              }}
            >
              <Icon
                raised
                name="chart-line"
                type="material-community"
                color="blue"
                size={28}
                iconStyle={{}}
                containerStyle={{}}
                onPress={() => this.props.navigation.navigate("Weightchart")}
              />
              <Icon
                raised
                name="add-circle-outline"
                type="MaterialIcons"
                color="blue"
                size={28}
                iconStyle={{}}
                containerStyle={{}} // alignSelf: "flex-end"
                onPress={() =>
                  this.setState({ showEnterWeightComponent: true })
                }
              />
            </View>
            <WeightDataListNativeElements weightData={this.state.weightData} />
          </Row>
        </Grid>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // paddingTop: 15,
    // backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
  // fab: {
  //   marginBottom: (window.window.height - window.window.height / 3.9)
  // }
});
