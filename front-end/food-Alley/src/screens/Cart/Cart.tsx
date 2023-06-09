import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Pressable, View, Text, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../components/GlobalStyles";
import ProdcutinCart from "../components/Productcart";
import { black } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";
import { color } from "react-native-reanimated";
import axios from "axios";

const Cart = () => {
    const [frameDropdownOpen, setFrameDropdownOpen] = useState(false);
  const [frameDropdownValue, setFrameDropdownValue] = useState("");
  const [frameDropdownItems, setFrameDropdownItems] = useState([
    { value: "Beirut", label: "Beirut" },
    { value: "lebanon", label: "lebanon" },
    { value: "Beirut", label: "Beirut" },
]);
const navigation = useNavigation();
const [orderItems, setOrderItems] = useState([] as any[]); // Set initial state as an empty array
const [products, setProducts] = useState([] as any[]); // Set initial state as an empty array
const [cartTotal, setCartTotal] = useState(0);
const [filteredProducts, setfilteredProducts]=useState([] as any[]);
const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    // Fetch the order items data and update the state
    axios.get("http://10.0.2.2:8000/api/order_items").then((response) => {
      console.log(response.data);
      setOrderItems(response.data);
    });

    // Fetch the product data and update the state
    axios.get("http://10.0.2.2:8000/api/recipes").then((response) => {
      console.log(response.data);
      setProducts(response.data);
      
    });
  }, []);

  // Filter the products based on the order items
  

  useEffect(() => {
    setfilteredProducts(orderItems.length > 0
      ? products.filter((product) =>
          orderItems.some((item) => item.recepie_id === product.id)
        )
      : []
    );
  }, [products, orderItems]);

  useEffect(() => {
const totalPrices = filteredProducts.reduce((total, products) => {
  const orderItem = orderItems.find((item) => item.recepie_id === products.id);
  const productPrice = Number.isNaN(parseFloat(products.price)) ? 0 : parseFloat(products.price);
  console.log(productPrice)

  return total + productPrice ;
  

},
0);
setTotalPrice(totalPrices)

  
  console.log(totalPrices);
}, [filteredProducts]);

useEffect(() => {
  // Fetch the product data and update the state
  axios.get("http://10.0.2.2:8000/api/recipes").then((response) => {
    console.log(response.data);
    setProducts(response.data);

  });
}, []);
    return(

        <View style={styles.cart}>
      <Image
        style={styles.yourFoodCart}
        resizeMode="cover"
        source={require("../../../assets/FoodCart.png")}
      />
      <Image
        style={[styles.cartChild, styles.wrapperPosition]}
        resizeMode="cover"
        source={require("../../../assets/cartShape.png")}
      />
      
      <Image
        style={[styles.line26Stroke, styles.wrapperPosition]}
        resizeMode="cover"
        source={require("../../../assets/line.png")}
      />
      
      <Pressable style={[styles.rectangleParent, styles.groupChildLayout]}>
        <View style={[styles.groupChild, styles.groupChildLayout]} />
        <Text style={[styles.placeOrder, styles.placeOrderTypo]}>
          Place order
        </Text>
       
      </Pressable>
      <View style={[styles.wrapper, styles.wrapperPosition]}>
        <DropDownPicker
          open={frameDropdownOpen}
          setOpen={setFrameDropdownOpen}
          value={frameDropdownValue}
          setValue={setFrameDropdownValue}
          placeholder="location name"
          items={frameDropdownItems}
          badgeColors={Color.black}
          labelStyle={styles.frameDropdownValue}
          textStyle={styles.frameDropdownText}
        />
      </View>
      <ScrollView >
      <View style={[styles.productsContainer]}>
      {filteredProducts.map((product) => (
        
          <ProdcutinCart key={product.id} product={product} />
         
        ))}
         </View>
        </ScrollView>

      
      <Pressable  onPress={() => navigation.navigate("selectLocation")}>

      <Text style={[styles.chooseLocation]}>
        choose location
      </Text>
      </Pressable>
      <Pressable style={styles.arrowLeft3} onPress={() => navigation.goBack()}>
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../../../assets/arrow.png")}
        />
      </Pressable>
      <Text style={[styles.subTotal, styles.taxTypo]}>sub total:</Text>
      <Text style={[styles.cartTotal, styles.text1Typo]}>Cart Total:</Text>
      <Text style={[styles.delivery, styles.taxTypo]}>Delivery:</Text>
      <Text style={[styles.tax, styles.taxTypo]}>Tax:</Text>
      <Text style={[styles.text, styles.textTypo]}>{totalPrice+52+52}$</Text>
      <Text style={[styles.text1, styles.text1Typo]}>{totalPrice}$</Text>
      <Text style={[styles.text2, styles.textTypo]}>52$</Text>
      <Text style={[styles.text3, styles.textTypo]}>52$</Text>
    </View>
    );
};
const styles = StyleSheet.create({
    frameDropdownValue: {
      color: Color.d9D9D9,
      fontSize: 20,
      fontWeight: "800",
      fontFamily: "Inter_extrabold",
      
    },
    productsContainer:{
        display:"flex",
        
        flexDirection:"column",
        justifyContent:"space-between", 
         marginTop:"30%",
        alignContent:"space-around",
         bottom:"-10%", 
        left:"5%",
       width:200,
        height:"50%"


    },
    
    frameDropdownText: {
    
    
      color: Color.d9D9D9,
      fontSize: 14,
      fontWeight: "800",
      fontFamily: "Inter_extrabold",
    },
    wrapperPosition: {
      width: "100%",
      left: 0,
      position: "absolute",
    },
    groupChildLayout: {
      height: 55,
      width: 216,
      position: "absolute",
    },
    placeOrderTypo: {
      textAlign: "center",
      left:"33%",
      top:"30%",
      fontFamily: FontFamily.interExtrabold,
      fontWeight: "800",
      position: "absolute",
    },
    taxTypo: {
      color: "#fff",
      textAlign: "left",
      fontFamily: FontFamily.interExtrabold,
      fontWeight: "800",
      fontSize: FontSize.size_mini,
      position: "absolute",
    },
    text1Typo: {
      top: 618,
      color: "#FFFF",
      textAlign: "left",
      fontFamily: FontFamily.interExtrabold,
      fontWeight: "800",
      fontSize: FontSize.size_mini,
      position: "absolute",
    },
    textTypo: {
      left: 335,
      color: "#FFFF",
      textAlign: "left",
      fontFamily: FontFamily.interExtrabold,
      fontWeight: "800",
      fontSize: FontSize.size_mini,
      position: "absolute",
    },
    yourFoodCart: {
      top: 57,
      left: 138,
      width: 142,
      height: 20,
      position: "absolute",
    },
    cartChild: {
      top: 557,
      
      height: 295,
    },
    line26Stroke: {
      top: 635,
      height: 1,
    },
    groupChild: {
      top: 0,
      borderRadius: Border.br_3xs,
      backgroundColor: Color.d9D9D9,
      left: 0,
      width: 216,
    },
    placeOrder: {
      top: 19,
      left: 61,
      color: Color.wFBase300,
      fontSize: FontSize.size_mini,
      textAlign: "left",
      fontFamily: FontFamily.interExtrabold,
      fontWeight: "800",
    },
    rectangleParent: {
      top: 743,
      left: 90,
    },
    wrapper: {
        
      top: "53%",
      width:"60%"
    },
    chooseLocation: {
      top: "48%",
      left: "3%",
      fontFamily:FontFamily.soraRegular,
      fontSize: FontSize.size_lg,
      color: Color.black,
    },
    icon: {
      height: "100%",
      width: "100%",
    },
    arrowLeft3: {
      left: 18,
      top: 37,
      width: 50,
      height: 50,
      position: "absolute",
    },
    subTotal: {
      left: 25,
      top: 664,
    },
    cartTotal: {
      left: 17,
    },
    delivery: {
      left: 19,
      top: 582,
    },
    tax: {
      left: 24,
      top: 600,
    },
    text: {
      top: 664,
    },
    text1: {
      left: 336,
    },
    text2: {
      top: 600,
    },
    text3: {
      top: 582,
    },
    cart: {
      backgroundColor: "#edf0f7",
      flex: 1,
      height: 852,
      overflow: "hidden",
      width: "100%",
    },
  });
  
  export default Cart;