import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
import template from '../data/template'
import { useQuery } from 'graphql-hooks'

const LIST_CALENDAR_QUERY = `
  query ListCalendarQuery {
    calendars {
      id
      image
      label
      day
      time
      order
    }
  }
`

let changeViewFun;

function mapDataToTemplate(data) {
  let resultData = JSON.parse(JSON.stringify(template))

  data.calendars.forEach(item => {
    resultData[item.day][item.time].push(item)
  })

  return resultData
}

function Time({day, time, images}) {
  return (
    <View key={`${day}-${time}`} style={styles.section}>
      {images.map(activity => (<Image
        key={`${day}-${time}-${activity.label}`}
        style={{ width: 65, height: 65, margin: 5 }}
        source={{ uri: activity.image }}
      />))}
    </View>
  )
}

function CalendarDay({day, navigation, data}) {
  return (
    <View key={day} style={styles.day}>
      <TouchableOpacity 
        style={styles.title} 
        onPress={() => navigation.navigate('Day', {...data, day: day.toUpperCase()})}
      >
        <Text>{day}</Text>
        <Feather name="plus-square" size={32} color="#DDF1E3" />
      </TouchableOpacity>
      <Time day={day} time="MORNING" images={data.MORNING} />
      <Time day={day} time="AFTERNOON" images={data.AFTERNOON} />
      <Time day={day} time="NIGHT" images={data.NIGHT} />
    </View>
  )
}

function Calendar({ navigation }) {
  const [view, setView] = useState(7)
  const {
    data = { calendars: [] },
    refetch: refetchCalendars
  } = useQuery(LIST_CALENDAR_QUERY)

  changeViewFun = setView.bind(this)

  let dataFiltered = mapDataToTemplate(data)

  return (
    <View style={styles.container}>
      <View style={[styles.day, styles.leftColumn]}>
        <View style={styles.title}>
          <Text></Text>
        </View>
        <View style={[styles.section, styles.sectionLeftColumn]}>
          <Text>day</Text>
        </View>
        <View style={[styles.section, styles.sectionLeftColumn]}>
          <Text>pm</Text>
        </View>
        <View style={[styles.section, styles.sectionLeftColumn]}>
          <Text>night</Text>
        </View>
      </View>
      <CalendarDay day="Monday" navigation={navigation} data={dataFiltered.MONDAY} />
      {view >= 5 && (
        <>
          <CalendarDay day="Tuesday" navigation={navigation} data={dataFiltered.TUESDAY} />
          <CalendarDay day="Wednesday" navigation={navigation} data={dataFiltered.WEDNESDAY} />
          <CalendarDay day="Thursday" navigation={navigation} data={dataFiltered.THURSDAY} />
          <CalendarDay day="Friday" navigation={navigation} data={dataFiltered.FRIDAY} />
        </>
      )}
      {view === 7 && (
        <>
          <CalendarDay day="Saturday" navigation={navigation} data={dataFiltered.SATURDAY} />
          <CalendarDay day="Sunday" navigation={navigation} data={dataFiltered.SUNDAY} />
        </>
      )}
    </View>
  );
}

Calendar.navigationOptions = {
  headerTitle: 'Calendar',
  drawerLabel: 'Home',
  headerRight: () => {
    return (
      <View style={{marginRight: 5, flex: 1, flexDirection: 'row'}}>
        <Button
          title="1"
          onPress={() => {
            changeViewFun && changeViewFun(1)
          }}
        />
        <Button
          title="5"
          onPress={() => {
            changeViewFun && changeViewFun(5)
          }}
        />
        <Button
          title="7"
          onPress={() => {
            changeViewFun && changeViewFun(7)
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  day: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'peru',
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 0.5,
    borderTopColor: 'peru',
  },
  title: {
    alignItems: 'center',
    color: 'red',
    height: 50,
  },
  leftColumn: {
    flexGrow: .23,
  },
  sectionLeftColumn: {
    justifyContent: 'center',
  }
});

export default Calendar
