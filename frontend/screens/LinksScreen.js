import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { AppRegistry,SectionList, FlatList, Text, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Lists',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
           <View style={styles.container}>
             <SectionList
               sections={[
                 {title: 'Subway Station', data: ['Kingsbridge Rd', 'Times Sq-42 St', '5 Avenue', 'Roosevelt Av - Jackson Heights', 'Prospect Park']},
                 {title: 'Taxi (Shown by name)', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
                 {title: 'Bus (Shown by No.)', data: ['1023', '1743', '1888', '2018', '3795', '4245', '6823']},
               ]}
               renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
               renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
               keyExtractor={(item, index) => index}
             />
           </View>
                      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  sectionHeader: {
  paddingTop: 2,
  paddingLeft: 10,
  paddingRight: 10,
  paddingBottom: 2,
  fontSize: 14,
  fontWeight: 'bold',
  backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
