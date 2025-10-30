import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
  placeholder?: string;
}

export default function DatePicker({ value, onChange, placeholder = "Seleccionar fecha" }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  const formattedDate = value ? value.toLocaleDateString('es-AR') : placeholder;

  const onPickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);

    if (event.type === 'set' && selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className="py-3 px-4 bg-gray-100 rounded-xl flex-row justify-between items-center"
      >
        <Text className={`text-base ${value ? 'text-gray-900' : 'text-gray-500'}`}>
          {formattedDate}
        </Text>
        <Calendar size={20} color="#6B7280" />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={onPickerChange}
        />
      )}
    </View>
  );
}