import React from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';

const Card = React.forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
    ({ className, ...props }, ref) => (
        <View
            ref={ref}
            className={cn(
                'rounded-xl border border-gray-200 bg-white shadow-sm',
                className
            )}
            {...props}
        />
    )
);
Card.displayName = "Card";

const CardContent = React.forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
    ({ className, ...props }, ref) => (
        <View ref={ref} className={cn('p-4', className)} {...props} />
    ));
CardContent.displayName = "CardContent";

export { Card, CardContent };
