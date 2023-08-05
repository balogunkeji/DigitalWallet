import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => response.json())
      .then((data) => {
        let areaData = data.map((item) => {
          return {
            code: item.alpha2Code,
            name: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`,
          };
        });

        setAreas(areaData);

        if (areaData.length > 0) {
          let defaultData = areaData.filter((a) => a.code == "US");

          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      });
  }, []);

  const [fontsLoaded] = useFonts(FONTS);
  console.log(fontsLoaded);
  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: SIZES.padding * 6,
          paddingHorizontal: SIZES.padding * 2,
        }}
        onPress={() => console.log("Press")}
      >
        <Image
          source={icons.back}
          style={{ width: 20, height: 20, tintColor: COLORS.white }}
          resizeMode="contain"
        />
        <Text style={{ color: COLORS.white, ...FONTS.h4, marginLeft: 15 }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    );
  }

  function renderImage() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 5,
          justifyContent: "center",
          alignItems: "center",
          height: 100,
        }}
      >
        <Image
          source={images.wallieLogo}
          style={{ width: "60%" }}
          resizeMode="contain"
        />
      </View>
    );
  }
  function renderForm() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 3,
          marginHorizontal: SIZES.padding * 3,
        }}
      >
        <View
          style={{
            marginTop: SIZES.padding * 3,
          }}
        >
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            Full Name
          </Text>
          <TextInput
            style={{
              color: COLORS.white,
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderWidth: 1,
              height: 40,
              borderColor: "transparent",
              ...FONTS.body3,
            }}
            placeholder="Enter Full Name"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
          />
        </View>
        <View
          style={{
            marginTop: SIZES.padding * 3,
          }}
        >
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            Phone Number
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 50,
                marginHorizontal: 5,
                borderBottomColor: COLORS.white,
                borderWidth: 1,
                borderColor: "transparent",
                flexDirection: "row",
              }}
              onPress={() => console.log("show modal")}
            >
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={icons.down}
                  style={{ tintColor: COLORS.white, width: 10, height: 10 }}
                />
              </View>
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Image
                  source={images.usFlag}
                  style={{ width: 30, height: 30 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                  US+1
                </Text>
              </View>
            </TouchableOpacity>
            <TextInput
              style={{
                color: COLORS.white,
                marginVertical: SIZES.padding,
                borderBottomColor: COLORS.white,
                borderWidth: 1,
                height: 40,
                flex: 1,
                borderColor: "transparent",
                ...FONTS.body3,
              }}
              placeholder="Enter Phone Number"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: SIZES.padding * 3,
          }}
        >
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            Password
          </Text>
          <TextInput
            style={{
              color: COLORS.white,
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderWidth: 1,
              height: 40,
              borderColor: "transparent",
              ...FONTS.body3,
            }}
            placeholder="Enter Password"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 0,
              bottom: 10,
              height: 30,
              width: 30,
            }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={!showPassword ? icons.disable_eye : icons.eye}
              style={{ width: 20, height: 20 }}
              tintColor={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={{ margin: SIZES.padding * 3 }}>
        <TouchableOpacity
          style={{
            height: 60,
            borderRadius: SIZES.radius / 1.5,
            backgroundColor: COLORS.black,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => console.log("Navigation to Home")}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3, marginLeft: 15 }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={[COLORS.lime, COLORS.emerald]}
        style={{ flex: 1 }}
      >
        <ScrollView>
          {renderHeader()}
          {renderImage()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
