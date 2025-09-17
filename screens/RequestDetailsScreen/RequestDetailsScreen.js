import { View, Text, StyleSheet } from 'react-native';

const RequestDetailsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Request Details</Text>
    <Text>Details for the selected request will appear here.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFF' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
});

export default RequestDetailsScreen;
