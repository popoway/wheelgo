import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { SectionList, Image, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Kingsbridge Rd Station',
  };
  render() {
    const { manifest } = Constants;
    const sections = [
      { data: [{ value: "172 / 450" }], title: 'Current Traffic / Venue Capacity' },
      { data: [{ value: 4 }], title: 'Current People with Disabilities' },
      { data: [{ value: ["Johnhan Smith - hearing-impaired\n\n", "Donna Chan - epilepsy (low confidence)\n\n", "Tina Patience - blindness\n\n", "Mike C - blindness"] }], title: 'In Need List (Click on name for details)' },
      { data: [{ value: "1.2.1" }], title: 'Firmware Version' },
      { data: [{ value: ["Switch Location\n\n", "Log out hlehman07..."] }], title: 'Account' },
      { data: [{ value: ["Encountered a tech problem? Try the following:\n\n", "1. Online Customer Service (currently available)\n", "2. WheelGo Support Team 24/7 Hotline: 800-123-4567"] }], title: 'Contact Support Team' },
    ];

    return (
      <SectionList
        style={styles.container}
        renderItem={this._renderItem}
        renderSectionHeader={this._renderSectionHeader}
        stickySectionHeadersEnabled={true}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={ListHeader}
        sections={sections}
      />
    );
  }

  _renderSectionHeader = ({ section }) => {
    return <SectionHeader title={section.title} />;
  };

  _renderItem = ({ item }) => {
    if (item.type === 'color') {
      return (
        <SectionContent>
          {item.value && <Color value={item.value} />}
        </SectionContent>
      );
    } else {
      return (
        <SectionContent>
          <Text style={styles.sectionContentText}>
            {item.value}
          </Text>
        </SectionContent>
      );
    }
  };
}

const ListHeader = () => {
  const { manifest } = Constants;

  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleIconContainer}>
        <AppIconPreview iconUrl='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/MTA_NYC_logo.svg/1024px-MTA_NYC_logo.svg.png' />
      </View>

      <View style={styles.titleTextContainer}>
        <Text style={styles.nameText} numberOfLines={1}>
          Kingsbridge Rd Station
        </Text>

        <Text style={styles.slugText} numberOfLines={1}>
          Subway Station
        </Text>

        <Text style={styles.descriptionText}>
          Manager: Herbert H. Lehman
        </Text>
      </View>
    </View>
  );
};

const SectionHeader = ({ title }) => {
  return (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderText}>
        {title}
      </Text>
    </View>
  );
};

const SectionContent = props => {
  return (
    <View style={styles.sectionContentContainer}>
      {props.children}
    </View>
  );
};

const AppIconPreview = ({ iconUrl }) => {
  if (!iconUrl) {
    iconUrl =
      'https://s3.amazonaws.com/exp-brand-assets/ExponentEmptyManifest_192.png';
  }

  return (
    <Image
      source={{ uri: iconUrl }}
      style={{ width: 64, height: 64 }}
      resizeMode="cover"
    />
  );
};

const Color = ({ value }) => {
  if (!value) {
    return <View />;
  } else {
    return (
      <View style={styles.colorContainer}>
        <View style={[styles.colorPreview, { backgroundColor: value }]} />
        <View style={styles.colorTextContainer}>
          <Text style={styles.sectionContentText}>
            {value}
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  titleIconContainer: {
    marginRight: 15,
    paddingTop: 2,
  },
  sectionHeaderContainer: {
    backgroundColor: '#fbfbfb',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ededed',
  },
  sectionHeaderText: {
    fontSize: 14,
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
  sectionContentText: {
    color: '#808080',
    fontSize: 14,
  },
  nameText: {
    fontWeight: '600',
    fontSize: 18,
  },
  slugText: {
    color: '#a39f9f',
    fontSize: 14,
    backgroundColor: 'transparent',
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 6,
    color: '#4d4d4d',
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorPreview: {
    width: 17,
    height: 17,
    borderRadius: 2,
    marginRight: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  colorTextContainer: {
    flex: 1,
  },
});
