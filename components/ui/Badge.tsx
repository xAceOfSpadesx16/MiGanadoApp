import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { Text, View } from 'react-native';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
    'flex-row items-center rounded-md border px-2.5 py-1',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-amber-900',
                outline: 'border-amber-200 bg-amber-50',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const badgeTextVariants = cva('text-xs font-semibold', {
    variants: {
        variant: {
            default: 'text-white',
            outline: 'text-amber-900',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface BadgeProps
    extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof badgeVariants> {
    textClass?: string;
    children: React.ReactNode;
}

function Badge({ className, variant, children, textClass, ...props }: BadgeProps) {
    return (
        <View className={cn(badgeVariants({ variant }), className)} {...props}>
            <Text className={cn(badgeTextVariants({ variant }), textClass)}>
                {children}
            </Text>
        </View>
    );
}

export { Badge, badgeVariants };
