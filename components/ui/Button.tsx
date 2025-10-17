import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
    'flex-row items-center justify-center rounded-xl active:opacity-80',
    {
        variants: {
            variant: {
                default: 'bg-amber-900',
                destructive: 'bg-red-500',
                outline: 'border border-gray-300 bg-transparent',
                secondary: 'bg-gray-100',
                ghost: 'bg-transparent',
            },
            size: {
                default: 'h-11 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-12 rounded-md px-8',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

const buttonTextVariants = cva('text-base font-bold text-center', {
    variants: {
        variant: {
            default: 'text-white',
            destructive: 'text-white',
            outline: 'text-gray-800',
            secondary: 'text-gray-900',
            ghost: 'text-amber-900',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface ButtonProps
    extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
    textClass?: string;
}

function Button({ className, variant, size, children, textClass, ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        >
            {typeof children === 'string' ? (
                <Text className={cn(buttonTextVariants({ variant }), textClass)}>{children}</Text>
            ) : (
                children
            )}
        </TouchableOpacity>
    );
};

export { Button, buttonVariants };
