import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import SearchList from './SearchList'

export default function Day({ navigation }) {
  const [addedImage, setAddedImage] = useState(null);

  const dayData = navigation.state.params

  let dataFiltered = dayData

  let morning = dataFiltered.MORNING
  let afternoon = dataFiltered.AFTERNOON
  let night = dataFiltered.NIGHT

  if (addedImage) {
    if (addedImage.time === 'MORNING') {
      morning.push(addedImage)
    } else if (addedImage.time === 'AFTERNOON') {
      afternoon.push(addedImage)
    } else if (addedImage.time === 'NIGHT') {
      night.push(addedImage)
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={[styles.dayContainer, { backgroundColor: '#F7DB11' }]}>
          {morning.map(image => <Image
            key={`${image.id}_morning_image`} 
            style={styles.image}
            source={{ uri: image.image }} 
          />)}
        </View>
        <View style={[styles.dayContainer, { backgroundColor: '#F79211' }]}>
          {afternoon.map(image => <Image
            key={`${image.id}_afternoon_image`} 
            style={styles.image}
            source={{ uri: image.image }} 
          />)}
        </View>
        <View style={[styles.dayContainer, { backgroundColor: '#050788' }]}>
          {night.map(image => <Image
            key={`${image.id}_night_image`} 
            style={styles.image}
            source={{ uri: image.image }} 
          />)}
        </View>
      </View>
      <SearchList day={dayData.day} setAddedImage={setAddedImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    height: '100%',
    flex: 1,
    flexGrow: 55,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  dayContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '33.333333%'
  },
  image: {
    width: 100, 
    height: 100, 
    margin: 5,
  }
});
