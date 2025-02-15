import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View, TouchableOpacity, Image, Text, ScrollView, Switch, navigation, Dimensions} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Background from './Background';


export default function SettingsPg() {

  const [form, setForm] = useState({
    notifications: true,
  });

  return(
    <SafeAreaView style = {{flex:1}}>
      <Background type = "type2"/>

        <View style = {styles.container}> 
          <Text style = {styles.headerText}>APP Settings</Text>
          <FeatherIcon name="settings" style = {styles.mainIcon} />
        </View>

        <ScrollView>
          <View style = {styles.section}>

            {/* Language changer */}
            <TouchableOpacity onPress={() => navigation.navigate ('Language.js') } style = {styles.row}>
              <View style = {styles.box}>
                <FeatherIcon name="globe" style = {styles.icon}/>
              </View>
              <Text style = {styles.rowLabel}>Language</Text>
              <View style = {styles.rowSpacer}/>

              <FeatherIcon color = 'black' name='chevron-right' size={30}/>
            </TouchableOpacity>

            {/* Security button */}
            <TouchableOpacity onPress={() => navigation.navigate ('Security.js')} style = {styles.row}>
              <View style = {styles.box}>
                <FeatherIcon name="shield" style = {styles.icon}/>
              </View>

              <Text style = {styles.rowLabel}>Security</Text>
              <View style = {styles.rowSpacer}/>

              <FeatherIcon color = 'black' name='chevron-right' size={30}/>              
            </TouchableOpacity>

            {/* Notification changer */}
            
            <View style = {styles.row}>
              <View style = {styles.box}>
                <FeatherIcon name="bell" style = {styles.icon}/>
              </View>
              

              <Text style = {styles.rowLabel}>Notifications</Text>
              <View style = {styles.rowSpacer}/>

              <Switch onValueChange={notifications => setForm ({...form, notifications})} value = {form.notifications}/>
            </View>
            

            {/* About App */}
            <TouchableOpacity onPress={() => navigation.navigate ('AboutUs.js')} style = {styles.row}>
              <View style = {styles.box}>
                <FeatherIcon name="info" style = {styles.icon}/>
              </View>
            
              <Text style = {styles.rowLabel}>About App</Text>
              <View style = {styles.rowSpacer}/>

              <FeatherIcon color = 'black' name='chevron-right' size={30}/>
            </TouchableOpacity>

            {/* RateUs */}
            <TouchableOpacity onPress={() => navigation.navigate ('Rate.js')} style = {styles.row}>
              <View style = {styles.box}>
                <FeatherIcon name="thumbs-up" style = {styles.icon}/>
              </View>
            
              <Text style = {styles.rowLabel}>Rate Us</Text>
              <View style = {styles.rowSpacer}/>

              <FeatherIcon color = 'black' name='chevron-right' size={30}/>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
    </SafeAreaView>
  )
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container:{ 
    alignItems: 'center', 
    marginTop: height * 0.05, 
  },
  
  headerText:{
    fontSize: width * 0.08,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },

  mainIcon:{
    fontSize: 60,
    color: 'black',
    marginTop: height * 0.02,
  },

  section:{
    paddingHorizontal: width * 0.1,
    paddingTop: height * 0.1,
  },

  icon:{
    fontSize:30,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  row:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 55,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    marginBottom: 30,
    paddingHorizontal: 12,
  },

  rowLabel:{
    fontSize: width * 0.05,
    paddingLeft: width * 0.02,
    fontWeight: 'bold',
    color: '#0c0c0c',
  },

  rowSpacer:{
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});