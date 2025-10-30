import React, { useState } from 'react';
import { Image, ImageURISource } from 'react-native';

interface ImageWithFallbackProps {
  src: string | undefined; // La URL de la foto del animal
  className: string;
}

const DEFAULT_IMAGE_URI = 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

export default function ImageWithFallback({ src, className }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  const isValidSrc = src && src.length > 0;

  const source: ImageURISource = (isValidSrc && !hasError)
    ? { uri: src }
    : { uri: DEFAULT_IMAGE_URI };

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