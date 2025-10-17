// en components/ui/Select.tsx

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
    return (
        <View className={`border border-gray-200 rounded-xl ${enabled ? 'bg-gray-100' : 'bg-gray-200'}`}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                prompt={placeholder}
                enabled={enabled} // <-- LA PASAMOS AL PICKER
            >
                {placeholder && (
                    <Picker.Item label={placeholder} value={undefined} style={{ color: 'grey' }} />
                )}
                {items.map(item => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
            </Picker>
        </View>
    );
};

export { Select };
