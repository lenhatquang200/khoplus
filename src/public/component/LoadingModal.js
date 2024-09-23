import React from 'react';
import { Modal, View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingModal = ({ visible, message }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color="#1e6091" />
          <Text style={styles.message}>{message || 'Loading...'}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Màu nền mờ của modal
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
    textAlign: 'center',
    color: '#1e6091', // Màu chủ đạo
  },
});

export default LoadingModal;
