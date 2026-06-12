"use client";

import Image from "next/image";
import { useState } from "react";
import ImageSkeleton from "./ImageSkeleton";

type ProgressiveImageProps = {
  src: string;
  alt: string;
};

export default function ProgressiveImage({
  src,
  alt,
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <ImageSkeleton />}

      <Image
        fill
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity rounded-lg duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}