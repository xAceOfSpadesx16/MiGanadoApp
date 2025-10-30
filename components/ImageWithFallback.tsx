import React, { useState } from 'react';
import { Image, ImageSourcePropType } from 'react-native';

interface ImageWithFallbackProps {
  src: string | undefined;
  className: string;
}

const DEFAULT_IMAGE: ImageSourcePropType = require('../assets/images/placeholder.webp');

export default function ImageWithFallback({ src, className }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  const isValidSrc = src && src.length > 0;
  const source = (isValidSrc && !hasError) ? { uri: src } : DEFAULT_IMAGE;

  return (
    <Image
      source={source}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true);
        }
      }}
    />
  );
}