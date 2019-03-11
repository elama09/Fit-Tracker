import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Picker,
  Button,
  Toast
} from "native-base";
import { GetProfile } from "../../utils/AsyncStorage";

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };

  constructor(props) {
    super(props);
    this.state = {
      pickerValue: "male",
      startingWeight: "",
      targetWeight: "",
      height: ""
    };
  }

  handleSaveButton() {
    const regexWeightCheck = /[1-9][0-9]{0,2}\.?[0-9]{0,2}/;
    const regexHeightCheck = /[1-9][0-9]{2}/;
    const startingWeightResult = this.state.startingWeight.match(
      regexWeightCheck
    );
    const targetWeightResult = this.state.targetWeight.match(regexWeightCheck);
    const heightResult = this.state.height.match(regexHeightCheck);
    if (
      startingWeightResult &&
      startingWeightResult[0] === startingWeightResult.input &&
      targetWeightResult &&
      targetWeightResult[0] === targetWeightResult.input &&
      heightResult &&
      heightResult[0] === heightResult.input
    ) {
      // Own showToast function with params...
      Toast.show({
        text: "Saved!",
        type: "success",
        position: "bottom",
        duration: 2000,
        textStyle: { fontSize: 20, textAlign: "center" }
      });
    } else {
      Toast.show({
        text: "Please correct values..",
        // type: "danger",
        position: "bottom",
        duration: 2000,
        textStyle: { fontSize: 20, textAlign: "center" }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Container>
          {/* <Header /> */}
          <Content padder>
            <Form>
              <Card>
                <CardItem header bordered>
                  <Text>Your profile</Text>
                </CardItem>
                <CardItem>
                  <Item floatingLabel>
                    <Icon active name="home" />
                    <Label>Starting weight (kg)</Label>
                    <Input
                      maxLength={5}
                      keyboardType="decimal-pad"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => {
                        this.secondInput._root.focus();
                      }}
                      onChangeText={startingWeight =>
                        this.setState({ startingWeight })
                      }
                    />
                  </Item>
                </CardItem>
                <CardItem>
                  <Item floatingLabel>
                    <Icon active name="home" />
                    <Label>Target weight (kg)</Label>
                    <Input
                      maxLength={5}
                      keyboardType="decimal-pad"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      getRef={input => {
                        this.secondInput = input;
                      }}
                      onSubmitEditing={() => {
                        this.thirdInput._root.focus();
                      }}
                      onChangeText={targetWeight =>
                        this.setState({ targetWeight })
                      }
                    />
                  </Item>
                </CardItem>
                <CardItem>
                  <Item floatingLabel>
                    <Label>Height (cm)</Label>
                    <Input
                      maxLength={3}
                      keyboardType="decimal-pad"
                      returnKeyType="done"
                      blurOnSubmit={true}
                      getRef={input => {
                        this.thirdInput = input;
                      }}
                      onChangeText={height => this.setState({ height })}
                    />
                    <Icon active name="swap" />
                  </Item>
                </CardItem>
                <CardItem>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      placeholder="Select your SIM"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.pickerValue}
                      onValueChange={pickerValue =>
                        this.setState({ pickerValue })
                      }
                    >
                      <Picker.Item label="Male" value="male" />
                      <Picker.Item label="Female" value="female" />
                      <Picker.Item label="Doesn't matter" value="unknown" />
                    </Picker>
                  </Item>
                </CardItem>

                {/* <CardItem footer bordered>
                  <Text>Footer if needed</Text>
                </CardItem> */}
                <Button block iconLeft onPress={() => this.handleSaveButton()}>
                  <Icon name="save" />
                  <Text>Save</Text>
                </Button>
                <Text>Save</Text>
                <Button block large iconRight >
                  <Text>Save</Text>
                  <Icon name="save" />
                </Button>
              </Card>
            </Form>
          </Content>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
