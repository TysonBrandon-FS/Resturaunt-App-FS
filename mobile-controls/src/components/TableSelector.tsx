import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { TableSelectorProps } from '../types';

const DEFAULT_TABLES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function TableSelector({
  selectedTable,
  onSelectTable,
  tables = DEFAULT_TABLES,
  disabled = false
}: TableSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>TABLE NUMBER</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tableRow}
      >
        {tables.map((table) => {
          const isSelected = selectedTable === table;
          return (
            <Pressable
              key={table}
              style={[
                styles.tableButton,
                isSelected && styles.tableButtonActive,
                disabled && styles.tableButtonDisabled
              ]}
              onPress={() => onSelectTable(table)}
              disabled={disabled}
            >
              <Text
                style={[
                  styles.tableText,
                  isSelected && styles.tableTextActive
                ]}
              >
                {table}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <Text style={styles.helper}>
        {selectedTable ? `Table ${selectedTable} selected` : 'Choose a table'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: '#8a8499',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  tableRow: {
    gap: 10,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  tableButton: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#fff8f3',
    borderWidth: 1,
    borderColor: '#f1e5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableButtonActive: {
    backgroundColor: '#ff7f5c',
    borderColor: '#ff7f5c',
    shadowColor: '#ff7f5c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  tableButtonDisabled: {
    opacity: 0.4,
  },
  tableText: {
    color: '#2b2540',
    fontSize: 20,
    fontWeight: '700',
  },
  tableTextActive: {
    color: '#ffffff',
  },
  helper: {
    color: '#b6b1c2',
    fontSize: 11,
    marginTop: 10,
  },
});
