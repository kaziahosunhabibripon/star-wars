import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";
import { useState } from "react";

interface CharacterImageProps {
  characterImageUrl?: string;
  alt: string;
}

export default function CharacterImage({
  characterImageUrl,
  alt,
}: CharacterImageProps) {
  const [imageError, setImageError] = useState(false);

  const isValidSrc = characterImageUrl && characterImageUrl.trim() !== "";

  return (
    <>
      {!imageError && isValidSrc ? (
        <Image
          src={characterImageUrl}
          alt={alt}
          width={500}
          height={500}
          className="object-cover"
          priority
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-purple-50">
          <FaCircleUser className="h-28 w-28 text-gray-400" />
        </div>
      )}
    </>
  );
}
