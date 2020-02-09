import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput } from 'react-native';
import SearchImage from './SearchImage'
import images from '../../data/images'

export default function SearchList({day, setAddedImage}) {
  const [query, setQuery] = useState('');
  const [touchedImage, setTouchedImage] = useState(null);

  return (
    <View style={styles.right}>
      <TextInput 
        style={{ width: '100%', height: 30, margin: 5 }}
        onChangeText={text => setQuery(text)}
        value={query}
        placeholder={'Search for your kid activity'}
      />
      <ScrollView contentContainerStyle={styles.scrollImages} >
        {images.map(item => 
          <SearchImage 
            key={`image_query_${item.id}`} 
            item={item}
            touchedImage={touchedImage}
            setTouchedImage={setTouchedImage}
            day={day}
            setAddedImage={setAddedImage}
          />
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  right: {
    flex: 1,
    height: '100%',
    flexGrow: 45,
    backgroundColor: '#fff',
  },
  row: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
    justifyContent: 'space-evenly',
  }
});