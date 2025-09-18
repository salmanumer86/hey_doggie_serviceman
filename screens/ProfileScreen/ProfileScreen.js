import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const initialUser = {
  name: 'John Doe',
  employeeId: 'EMP12345',
  email: 'john.doe@email.com',
  phone: '(555) 123-4567',
  address: '123 Main St, Springfield, USA',
  avatar: null, 
};

const ProfileScreen = () => {
  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    address: user.address,
  });

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setForm({ name: user.name, phone: user.phone, address: user.address });
    setEditing(false);
  };
  const handleSave = () => {
    setUser({ ...user, ...form });
    setEditing(false);
    Alert.alert('Profile Updated', 'Your profile information has been saved.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Icon name="account" size={48} color="#fff" />
            </View>
          )}
        </View>
        {editing ? (
          <TextInput
            style={styles.nameInput}
            value={form.name}
            onChangeText={text => setForm(f => ({ ...f, name: text }))}
            placeholder="Full Name"
            placeholderTextColor="#bfc9da"
          />
        ) : (
          <Text style={styles.name}>{user.name}</Text>
        )}
        <Text style={styles.employeeId}>Employee ID: {user.employeeId}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Icon name="phone" size={20} color="#6B7280" />
          {editing ? (
            <TextInput
              style={styles.infoInput}
              value={form.phone}
              onChangeText={text => setForm(f => ({ ...f, phone: text }))}
              placeholder="Phone"
              placeholderTextColor="#bfc9da"
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.infoText}>{user.phone}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Icon name="map-marker" size={20} color="#6B7280" />
          {editing ? (
            <TextInput
              style={styles.infoInput}
              value={form.address}
              onChangeText={text => setForm(f => ({ ...f, address: text }))}
              placeholder="Address"
              placeholderTextColor="#bfc9da"
            />
          ) : (
            <Text style={styles.infoText}>{user.address}</Text>
          )}
        </View>
      </View>
      {editing ? (
        <View style={styles.editActions}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Icon name="content-save" size={20} color="#fff" />
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
          <Icon name="account-edit" size={20} color="#3B5BDB" />
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
        <Icon name="logout" size={20} color="#fff" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    padding: 20,
  },
  profileCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    padding: 24,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#3B5BDB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 2,
  },
  nameInput: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 2,
    borderBottomWidth: 1,
    borderColor: '#e0e7ff',
    width: 180,
    textAlign: 'center',
    paddingVertical: 2,
  },
  employeeId: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  email: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 2,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 15,
    color: '#374151',
    marginLeft: 10,
  },
  infoInput: {
    fontSize: 15,
    color: '#374151',
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: '#e0e7ff',
    flex: 1,
    paddingVertical: 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 12,
    width: '100%',
    justifyContent: 'center',
  },
  actionText: {
    color: '#3B5BDB',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B5BDB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
  },
  cancelText: {
    color: '#3B5BDB',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B5BDB',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginTop: 30,
    width: '100%',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProfileScreen;
