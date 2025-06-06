"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createServiceSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import { services } from "@/constant";
import { ChevronDown } from "lucide-react";
import { CloudinaryUpload } from "@/lib/cloudinary-upload";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ServiceFormData = z.infer<typeof createServiceSchema>;

const CreateServicePage = () => {
    const router = useRouter()
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(createServiceSchema),
  });
const category = watch("category");
  const handleImageUpload = (publicId: string) => {
    setValue("image", publicId);
  };

  const uploadService = api.service.create.useMutation({
     onSuccess: () => {
      toast.success("Service created successfully! 🎉");
      router.push("/provider/view");
    },
    onError: (error) => {
      toast.error("Failed to create service. 😔");
      console.error("Error creating service:", error);
    },
  })

  const onSubmit = (data: ServiceFormData) => {
    console.log("Form data:", data);
    const { serviceName, description, price, category, duration, image,serviceLocation } = data;
    const uploadServiceToDB = uploadService.mutateAsync({
        category,
        price,
        duration,
        description,
        image,
        serviceName,
        serviceLocation
    })
  };

  return (
    <div className="w-full rounded-lg border bg-white p-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-[#004838] md:text-3xl lg:text-4xl">
          Create Service
        </h1>
        <h2 className="mb-6 text-gray-600">
          Create your own service and start earning today 🚀
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* service name  */}
              <div>
                <Input
                  type="text"
                  placeholder="Service Name"
                  className="w-full rounded border p-2"
                  {...register("serviceName")}
                />
                {errors.serviceName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.serviceName.message}
                  </p>
                )}
              </div>
              {/* price  */}
              <div>
                <Input
                  type="text"
                  placeholder="Price (e.g., 360)"
                  className="w-full rounded border p-2"
                  {...register("price")}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                {...register('serviceLocation')}
                  type="text"
                  placeholder="Location"
                  className="w-full rounded border p-2"
                />
                {errors.serviceLocation && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.serviceLocation.message}
                  </p>
                )}
              </div>
              {/* category */}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full" asChild>
                    <Button
                      variant="outline"
                      className="flex w-full justify-between"
                    >
                      {category ?  category:"Select Category"}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="bg-background w-56 rounded-md border p-0 shadow-lg"
                    align="start"
                  >
                    <DropdownMenuLabel className="bg-background sticky top-0 z-10 border-b px-4 py-2 text-sm font-medium">
                      Categories
                    </DropdownMenuLabel>

                    <div className="max-h-[180px] overflow-y-auto">
                      {" "}
                      {/* Fixed height container */}
                      <DropdownMenuRadioGroup
                        value={category}
                        onValueChange={(value) => {
                          setValue("category",value, { shouldValidate:true });
                        }}
                      >
                        {services.map((service) => (
                          <DropdownMenuRadioItem
                            {...register("category")}
                            key={service}
                            value={service}
                            className="hover:bg-accent focus:bg-accent cursor-pointer px-4 py-2 text-sm"
                          >
                            {service}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </div>

                    {/* Visual indicator for scrollable content */}
                    <div className="from-background pointer-events-none sticky bottom-0 h-4 bg-gradient-to-t to-transparent" />
                  </DropdownMenuContent>
                </DropdownMenu>

                {errors.category && (
                  <p className="text-destructive mt-1 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>
              {/* description  */}
              <div>
                <textarea
                  placeholder="Description"
                  className="min-h-[100px] w-full rounded border p-2"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
              {/* duration  */}

              <div>
                <Input
                  {...register("duration")}
                  className="w-full rounded border p-2"
                  type="text"
                  placeholder="Duration (in mins) ex: 120"
                ></Input>
              </div>
              {/* image  */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Service Image
                </label>
                <CloudinaryUpload
                  onImageUpload={handleImageUpload}
                  {...register("image")}
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.image.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Create Service
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateServicePage;
