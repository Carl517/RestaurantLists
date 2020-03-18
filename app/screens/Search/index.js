import React, { Component } from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  BookingTime
} from "@components";
import Modal from "react-native-modal";
import styles from "./styles";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markedDates: {},
      checkinTime: "",
      checkoutTime: "",
      keyword: "",
      adult: 1,
      children: 1,
      night: 1,
      modalVisible: false,
      loading: false
    };
  }

  openModal(modal) {
    this.setState({
      modalVisible: modal
    });
  }

  setValue(mode, value) {
    const { adult, children, night } = this.state;
    switch (value) {
      case "adult":
        if (mode == "up") {
          this.setState({ adult: adult + 1 });
        } else {
          this.setState({ adult: adult - 1 > 0 ? adult - 1 : 0 });
        }
        break;
      case "children":
        if (mode == "up") {
          this.setState({ children: children + 1 });
        } else {
          this.setState({
            children: children - 1 > 0 ? children - 1 : 0
          });
        }
        break;
      case "night":
        if (mode == "up") {
          this.setState({ night: night + 1 });
        } else {
          this.setState({
            night: night - 1 > 0 ? night - 1 : 0
          });
        }
        break;
    }
  }

  renderModal() {
    const { adult, children, night } = this.state;
    return (
      <View>
        <Modal
          isVisible={this.state.modalVisible === "quest"}
          onSwipeComplete={() => this.setState({ modalVisible: false })}
          swipeDirection={["down"]}
          style={styles.bottomModal}
        >
          <View style={styles.contentFilterBottom}>
            <View style={styles.contentSwipeDown}>
              <View style={styles.lineSwipeDown} />
            </View>
            <View style={styles.contentActionModalBottom}>
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Text body1>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Text body1 primaryColor>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.lineRow}>
              <View>
                <Text body1>Adults</Text>
                <Text caption1 grayColor>
                  16+ years
                </Text>
              </View>
              <View style={styles.iconRight}>
                <TouchableOpacity
                  onPress={() => this.setValue("down", "adult")}
                >
                  <Icon
                    name="minus-circle"
                    size={24}
                    color={BaseColor.grayColor}
                  />
                </TouchableOpacity>
                <Text title1>{adult}</Text>
                <TouchableOpacity onPress={() => this.setValue("up", "adult")}>
                  <Icon
                    name="plus-circle"
                    size={24}
                    color={BaseColor.primaryColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.lineRow}>
              <View>
                <Text body1>Children</Text>
                <Text caption1 grayColor>
                  2-11 years
                </Text>
              </View>
              <View style={styles.iconRight}>
                <TouchableOpacity
                  onPress={() => this.setValue("down", "children")}
                >
                  <Icon
                    name="minus-circle"
                    size={24}
                    color={BaseColor.grayColor}
                  />
                </TouchableOpacity>
                <Text title1>{children}</Text>
                <TouchableOpacity
                  onPress={() => this.setValue("up", "children")}
                >
                  <Icon
                    name="plus-circle"
                    size={24}
                    color={BaseColor.primaryColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.modalVisible === "duration"}
          onSwipeComplete={() => this.setState({ modalVisible: false })}
          swipeDirection={["down"]}
          style={styles.bottomModal}
        >
          <View style={styles.contentFilterBottom}>
            <View style={styles.contentSwipeDown}>
              <View style={styles.lineSwipeDown} />
            </View>
            <View style={styles.contentActionModalBottom}>
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Text body1>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Text body1 primaryColor>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.lineRow, { marginBottom: 40 }]}>
              <View>
                <Text body1>Duration</Text>
                <Text caption1 grayColor>
                  Night
                </Text>
              </View>
              <View style={styles.iconRight}>
                <TouchableOpacity
                  onPress={() => this.setValue("down", "night")}
                >
                  <Icon
                    name="minus-circle"
                    size={24}
                    color={BaseColor.grayColor}
                  />
                </TouchableOpacity>
                <Text title1>{night}</Text>
                <TouchableOpacity onPress={() => this.setValue("up", "night")}>
                  <Icon
                    name="plus-circle"
                    size={24}
                    color={BaseColor.primaryColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={[
          BaseStyle.safeAreaView,
          { backgroundColor: BaseColor.whiteColor }
        ]}
        forceInset={{ top: "always" }}
      >
        {this.renderModal()}
        <Header
          title="Search"
          renderLeft={() => {
            return (
              <Icon name="times" size={20} color={BaseColor.primaryColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollView style={{ padding: 20, flex: 1 }}>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text => this.setState({ keyword: text })}
            autoCorrect={false}
            placeholder="What're you looking for ?"
            placeholderTextColor={BaseColor.grayColor}
            value={this.state.keyword}
            selectionColor={BaseColor.primaryColor}
          />
          <BookingTime style={{ marginTop: 15 }} />
          <View style={styles.contentQuest}>
            <TouchableOpacity
              style={styles.total}
              onPress={() => this.openModal("quest")}
            >
              <Text caption1 grayColor style={{ marginBottom: 5 }}>
                Total Guest(s)
              </Text>
              <Text body1 semibold>
                2 Adults, 1 Children
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.duration}
              onPress={() => this.openModal("duration")}
            >
              <Text caption1 grayColor style={{ marginBottom: 5 }}>
                Duration
              </Text>
              <Text body1 semibold>
                1 Night
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Button
            full
            onPress={() => {
              this.setState({ loading: true }, () => {
                setTimeout(() => {
                  navigation.navigate("Hotel");
                  this.setState({ loading: false });
                }, 500);
              });
            }}
            loading={this.state.loading}
          >
            Apply
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
