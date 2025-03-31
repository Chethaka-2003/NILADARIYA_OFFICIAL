import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Alert, FlatList, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import Background from "../Required/GradientBackground";

const { width, height } = Dimensions.get("window");


const API_BASE_URL = "https://niladariya-official-backend.onrender.com/profile";

export default function OfficerList() {
  const navigation = useNavigation();
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/getofficers`)
      .then(res => {
        if (res.data.status === "OK" && res.data.officers) {
          // Filter government officers only
          const governmentOfficers = res.data.officers.filter(officer => officer.userType === "government");
          setOfficers(governmentOfficers);
        } else {
          Alert.alert('Error', 'Could not fetch officers.');
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error', 'An error occurred while fetching officers.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#195b8c" />
      </SafeAreaView>
    );
  }

  const renderOfficer = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("OfficerPreview", { officerEmail: item.email })}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemEmail}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      
      <FlatList 
        data={officers}
        keyExtractor={(item) => item.email}
        renderItem={renderOfficer}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    marginTop: height * 0.1,
    paddingHorizontal: width * 0.05,
  },
  itemContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  itemEmail: {
    fontSize: 14,
    color: "gray",
  },
});
