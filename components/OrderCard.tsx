import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card, Icon } from '@rneui/themed';
import { useTailwind } from 'tailwind-rn/dist';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';

export type OrdersScreenNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamList, "Orders">,
NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
    item: Order;
}

const OrderCard = ({item}: Props) => {
  const tw = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigationProp>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Order", {order:item})}>
      <Card /* wrapperStyle={tw('bg-black p-1')} */
      containerStyle={tw('px-3 rounded-lg')}>
        <View style={tw('flex-row justify-between items-center')}>
          <View>
          <Icon 
          name='truck-delivery'
          color='#EB6A7C'
          type='material-community'
          />
          <Text style={{fontSize: 12}}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>

        <View style={tw('items-center ')}>
          <Text style={[tw('text-gray-500'), {fontSize:14}]}>{item.carrier}-{item.trackingId}</Text>
          <Text style={tw('text-gray-700 text-xl')}>{item.trackingItems.customer.name}</Text>
        </View>

        <View style={tw('flex-row items-center')}>
          <Text style={[tw("text-base"), {color: "#EB6A7C"}]}>
            {item.trackingItems.items.length} x</Text>
          <Icon style={tw('ml-1')} name='box' type='feather'/>
        </View>
        </View>
      </Card>
    </TouchableOpacity>

  )
}

export default OrderCard