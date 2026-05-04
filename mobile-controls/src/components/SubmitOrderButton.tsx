import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SubmitOrderButtonProps } from '../types';

export default function SubmitOrderButton({
  onSubmit,
  disabled = false,
  label = 'Submit Order'
}: SubmitOrderButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={disabled}
      >
        <Text style={styles.icon}>📨</Text>
        <Text style={[styles.text, disabled && styles.textDisabled]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 14,
    backgroundColor: '#ff7f5c',
    width: '100%',
    shadowColor: '#ff7f5c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#f1e5db',
    shadowOpacity: 0,
  },
  icon: {
    fontSize: 20,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  textDisabled: {
    color: '#b6b1c2',
  },
});
