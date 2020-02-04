import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import SearchList from './SearchList'
import template from '../../data/template'
import { useQuery } from 'graphql-hooks'

const LIST_DAY_QUERY = `
  query ListDayQuery($day: Day) {
    calendar(day: $day) {
      id
      image
      label
      day
      time
      order
    }
  }
`

function mapDataToTemplate(data, day) {
  let resultData = JSON.parse(JSON.stringify(template))

  data.calendar.forEach(item => {
    resultData[item.day][item.time].push(item)
  })

  return resultData[day]
}

export default function Day({ navigation }) {
  const dayData = navigation.state.params

  const {
    data = { calendar: [] },
    refetch: refetchDay
  } = useQuery(LIST_DAY_QUERY, {
    variables: {
      day: dayData.day
    }
  })

  let dataFiltered = mapDataToTemplate(data, dayData.day)

  let morning = dataFiltered.MORNING
  let afternoon = dataFiltered.AFTERNOON
  let night = dataFiltered.NIGHT

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
      <SearchList day={dayData.day} refetchDay={refetchDay} />
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
  },
  dayContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
    zIndex: 1
  },
  image: {
    width: 100, 
    height: 100, 
    margin: 5, 
    zIndex: 2
  }
});
