import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View } from 'react-native';

interface SelectItem {
    label: string;
    value: string | number;
}

interface SelectProps {
    selectedValue?: string | number;
    onValueChange: (itemValue: string | number, itemIndex: number) => void;
    items: SelectItem[];
    placeholder?: string;
    enabled?: boolean;
}

const Select = ({ selectedValue, onValueChange, items, placeholder, enabled = true }: SelectProps) => {
  const textColor = '#1F2937';
  const placeholderColor = '#6B7280';

  return (
    <View className={`border border-gray-200 rounded-xl ${enabled ? 'bg-gray-100' : 'bg-gray-200 opacity-70'}`}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        prompt={placeholder}
        enabled={enabled}
        style={{ color: textColor }}
      >
        {placeholder && (
            <Picker.Item label={placeholder} value={undefined} style={{ color: placeholderColor }} />
        )}
        {items.map(item => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

export { Select };

