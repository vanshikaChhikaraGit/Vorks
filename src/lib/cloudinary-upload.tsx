"use client";

import { Button } from "@/components/ui/button";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useState } from "react";
import { UploadCloud, X } from "lucide-react";

interface CloudinaryResult {
  public_id: string;
}

interface CloudinaryUploadProps {
  onImageUpload: (publicId: string) => void;
  value?: string;
}

export function CloudinaryUpload({
  onImageUpload,
  value,
}: CloudinaryUploadProps) {
  const [publicId, setPublicId] = useState(value || "");
  const [isUploading, setIsUploading] = useState(false);

  const handleRemoveImage = () => {
    setPublicId("");
    onImageUpload("");
  };

  return (
    <div className="space-y-4">
      {publicId ? (
        <div className="group relative">
          <CldImage
            width="300"
            height="200"
            src={publicId}
            alt="Uploaded service image"
            className="rounded-lg border object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 flex items-center rounded-lg bg-red-500 p-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
          >
            <X size={15} className="mr-1" /> Remove Image
          </button>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDIANRY_UPLOAD_PRESET_NAME}
          options={{
            sources: ["local"],
            multiple: false,
            maxFiles: 1,
            showPoweredBy: false,
          }}
          onUploadAdded={() => setIsUploading(true)}
          onSuccess={(result) => {
            const info = result.info as CloudinaryResult;
            setPublicId(info.public_id);
            onImageUpload(info.public_id);
            setIsUploading(false);
          }}
          onError={() => setIsUploading(false)}
        >
          {({ open }) => {
            // Add click handler to the entire drop zone
            return (
              <div
                className="hover:border-primary cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors"
                onClick={() => open()}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <UploadCloud className="h-10 w-10 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <span className="text-primary hover:text-primary/80 relative cursor-pointer rounded-md font-medium">
                      Upload an image
                    </span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                  {isUploading && (
                    <div className="mt-2 h-2.5 w-full rounded-full bg-gray-200">
                      <div
                        className="bg-primary h-2.5 animate-pulse rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            );
          }}
        </CldUploadWidget>
      )}
    </div>
  );
}
