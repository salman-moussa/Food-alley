import * as React from "react";
import { View, Image, StyleSheet, Pressable, Text, Dimensions, SafeAreaView, ImageSourcePropType, ScrollView, TouchableOpacity, ActionSheetIOS } from "react-native";
import { FontFamily, Color, Border, FontSize } from "../components/GlobalStyles";
import FoodItem from "../components/FoodItem";
import Searchbarcomp from "../components/Searchbarcomp";
import Discount from "../components/Discount";
import Bar from "../components/bar"
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Searchbar } from "react-native-paper";
import Productpage from "../ProductPage/Productpage";
import {   } from "@reduxjs/toolkit";

export interface Product {
  id: React.Key;
  name:string;
  description: string;
  preparation_time: string;
  price:string;
  kitchen_id:React.Key;
  imguri:string;
  // Other properties...
}

const HomePage = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch the product data and update the state
    axios.get("http://10.0.2.2:8000/api/recipes").then((response) => {
      console.log(response.data);
      setProducts(response.data);
      setFilteredProducts(response.data);

    });
  }, []);
  const handleSearch = (searchTerm: string) => {
    // Filter the products based on the search term
    setSearchTerm(searchTerm);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.homePage}>
      <View style={[styles.ellipseParent]}>
      <View style={[styles.search]}>
        <Searchbar 
        
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchTerm}
       
         />
        </View>
        <Pressable onPress={() => navigation.navigate("Cart")} >
        <Image
          style={styles.frameChild}
          resizeMode="cover"
          source={require("../../../assets/Ellipse2.png")as ImageSourcePropType}
        />
        </Pressable>
        
       
      </View>
      <Text style={[styles.suggestedFoods]}>
        Suggested foods
      </Text>
     
        
      <ScrollView >
        <View style={styles.foodItemsContainer}>
       
          {products.map((product) => (
            <Pressable onPress={() => navigation.navigate('Productpage')}><FoodItem key={product.id} FoodItem={product} /></Pressable>
          ))} 
          

        </View>
       
        </ScrollView>
   
      
      
      
     
      
      
      
      <View style={styles.homePageItem} />
      
      <Bar />
      
    </View>
  );
};

const styles = StyleSheet.create({
  items:{
    padding: 5,
    margin: 15
  },
  bar:{ top: 0,
    left: 0,
    width:"120%",
    height:"100%"},
  frameItemLayout: {
    height: 40,
    position: "absolute",
  },
  frameItemPosition: {
    top: 0,
    left: 0,
    width:"100%",
    height:"100%"
  },
  rectangleParentLayout: {
    height: 164,
    width: 162,
    position: "absolute",
  },
  container: {
   // flex: 1,
    //left:2,
    //top:"30%",
    //width:"100%",
    //height:"100%",
    //backgroundColor: "#fff",
  },
  foodItemsContainer: {
    display:"flex",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: "5%",
    top:"5%"
    

    
    
  },
  americanFoodTypo: {
    fontFamily: FontFamily.interExtrabold,
    fontWeight: "800",
    textAlign: "left",
    position: "absolute",
  },
  rectanglePosition: {
    top: 460,
    height: 164,
    width: 162,
    position: "absolute",
  },
  groupViewPosition: {
    top: 635,
    height: 164,
    width: 162,
    position: "absolute",
  },
  frameChild: {
    //top: "10%",
    //left: "13%",
    width: 80,
    height: 40,
    marginTop:"8%",
    //position: "absolute",
   // backgroundColor:Color.black
  },
  frameItem: {
    width: 40,
    left: 0,
    height: 40,
    position: "absolute",
  },
  search:{
   // top: "50%",
    width: "85%",
    //left: "15%",
    backgroundColor:"#FFFFF",
   // position:"absolute"
  },
  ellipseParent: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    top: 0,
    padding:"5%",
    marginTop:"5%",
    width: "100%",
    left: 0,
  },
  groupChild: {
    borderRadius: 13,
    backgroundColor: "#C70039",
    left: 0,
    top: 0,
  },
  groupItem: {
    top: 47,
    left: 29,
    borderRadius: Border.br_3xs,
    width: 99,
    height: 70,
    position: "absolute",
  },
  
  
  rectangleParent: {
    left: 0,
    top: 0,
  },
  homePageInner: {
   marginLeft:25,
  display:"flex",  
  width: "50%",
  flexDirection:"row",
  justifyContent:"space-between",
    top:"55%",
    left:"1%",
    
  },
  rectangleGroup: {
    left: 203,
  },
  rectangleContainer: {
    left: 24,
  },
  groupView: {
    left: 26,
  },
  rectangleParent1: {
    left: 203,
  },
  rectangleParent2: {
    left: 200,
    top: 270,
    width: 162,
  },
  homePageChild: {
    flexDirection:"column",
    
    top: "10%",
    backgroundColor: "#C70039",
    width: "100%",
    height: "12%",
    left: 0,
    position:"absolute"
    
  },
  suggestedFoods: {
    //top: "23%",
    fontSize: 20,
    fontWeight:800,
    
    color: Color.darkGray,
    left: "5%",
    
  },
  homePageItem: {
    top: "22%",
    left: 22,
    width: 353,
    height: 28,
    position: "absolute",
    overflow: "hidden",
  },
  homePage: {
    backgroundColor: Color.wFBaseWhite,
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
});

export default HomePage;
