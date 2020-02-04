import React, { useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useMutation } from 'graphql-hooks'

const CREATE_CALENDAR_MUTATION = `mutation CreateCalendar(
    $image: String!, 
    $label: String,
    $day: Day,
    $time: TimeSlot,
    $order: Int
  ) {
  createCalendar(calendar: { 
    image: $image,
    label: $label,
    day: $day,
    time: $time, 
    order: $order
  }) {
    id
    image
    label
    day
    time
    order
  }
}`

export default function SearchImage({ item, touchedImage, setTouchedImage, day, refetchDay }) {
  const [createCalendar] = useMutation(CREATE_CALENDAR_MUTATION)
  const _animatedWidth = new Animated.Value(0);

  useEffect(() => {
    if (touchedImage && touchedImage.id === item.id) {
      Animated.spring(_animatedWidth, {
        toValue: 1,
      }).start()
    } else {
      Animated.spring(_animatedWidth, {
        toValue: 0,
      }).start()
    }
  }, [touchedImage]);

  const openDrawer = () => {
    setTouchedImage(item)
  }

  const closeDrawer = async (time) => {
    setTouchedImage({})
    await createCalendar({ variables: {
      image: item.image,
      label: '',
      day: day,
      time: time
    }})
    refetchDay()
  }
  
  return (
    <View style={{}}>
      <TouchableOpacity onPress={() => openDrawer()}>
        <Image
          style={{ width: 100, height: 100, margin: 5, zIndex: 1 }}
          source={{ uri: item.image }}
        />
      </TouchableOpacity>
      <Animated.View style={[{
        position: 'absolute',
        top: -20,
        right: -15,
        width: _animatedWidth.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 140],
          extrapolate: 'clamp',
        }),
        transform: [{ scale: _animatedWidth }],
        height: 145,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
      }]}
      >
        <TouchableOpacity 
          style={{ backgroundColor: '#F7DB11', width: '100%', alignItems: 'center' }} 
          onPress={() => closeDrawer('MORNING')}
        >
          <Feather name="sunrise" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ backgroundColor: '#F79211', width: '100%', alignItems: 'center' }} 
          onPress={() => closeDrawer('AFTERNOON')}
        >
          <Feather name="sun" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ backgroundColor: '#050788', width: '100%', alignItems: 'center' }} 
          onPress={() => closeDrawer('NIGHT')}
        >
          <Feather name="moon" size={35} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
});
