import { type LucideIcon } from 'lucide-react-native';
import React from 'react';
import { cn } from '../lib/utils';

interface TabBarIconProps {
    icon: LucideIcon;
    color: string;
    className?: string;
}

export function TabBarIcon({ icon: Icon, color, className, ...rest }: TabBarIconProps) {
    return <Icon size={28} color={color} className={cn('mb-[-3px]', className)} {...rest} />;
}