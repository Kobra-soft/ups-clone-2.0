import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { 
  CompositeNavigationProp, 
  RouteProp, 
  useNavigation, 
  useRoute, } 
  from '@react-navigation/native';
import { useTailwind } from 'tailwind-rn/dist';
import { Icon } from '@rneui/base';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import useCustomerOrders from '../hooks/useCustomerOrders';
import DeliveryCard from '../components/DeliveryCard';

type ModalScreenNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamList>,
NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, "MyModal">

const ModalScreen = () => {  
  const tw = useTailwind();
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const {
    params: { name, userId},
  } = useRoute<ModalScreenRouteProp>();

  const { loading, error, orders} = useCustomerOrders(userId);


  return (
    // added SafeAreaView to prevent content from being hidden behind the notch!!!! 
    // MODAL doesnt work on android!!!
    <SafeAreaView>
      <TouchableOpacity 
        onPress={navigation.goBack} style={tw("absolute right-5 top-14 z-10")} 
        >
        <Icon name="closecircle" type="antdesign"/>
      </TouchableOpacity>

    <View style={{marginTop: 10}}>
      <View style={[tw("py-5 border-b"), {borderColor: "#59C1CC"}]}>
        <Text style={[tw("text-center text-xl font-bold"), {color:"#59C1CC"}]}>{name}</Text>
        <Text style={[tw("text-center italic text-sm")]}>Deliveries</Text>
      </View>
    </View>

    <FlatList 
      contentContainerStyle={{ paddingBottom: 200 }}
      data={orders}
      keyExtractor={order => order.trackingId}
      renderItem={({item: order}) => <DeliveryCard order={order} />}
      />

    </SafeAreaView>
  )
}

export default ModalScreen