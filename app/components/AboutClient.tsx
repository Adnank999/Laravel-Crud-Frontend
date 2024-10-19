import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useImageStore } from "@/store/useImageStore";
import { zodResolver } from "@hookform/resolvers/zod";

import { Upload } from "lucide-react";

import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { z } from "zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useToast } from "@/hooks/use-toast";

interface Props {
  userId: number;
}

const editFormSchema = z.object({
  profile_pic: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || file.size < 5000000, {
      message: "File can't be bigger than 5MB.",
    })
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "File format must be either jpg, jpeg, or png.",
      }
    ),
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50),
  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(13, "Phone number cannot exceed 11 digits")
    .refine((value) => validator.isMobilePhone(value, "any"), {
      message: "Please enter a valid phone number",
    }),

  country_code: z
    .string()
    .min(1, "Country code is required")
    .max(3, "Country code cannot exceed 3 digits")
    .refine((value) => /^\d+$/.test(value), {
      message: "Country code must contain only numbers",
    }),
  company: z.string().min(2, "Company must be at least 2 characters").max(50),
  position: z.string().min(2, "Position must be at least 2 characters").max(50),
});

export type AboutClientFormSchema = z.infer<typeof editFormSchema>;

const AboutClient = ({ userId }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<AboutClientFormSchema>({ resolver: zodResolver(editFormSchema) });

  const { image, setImage } = useImageStore();

  const { toast } = useToast();

  const handleImageChange = (e:any) => {
    const file = e.target.files ? e.target.files[0] : null;

    // console.log("file", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("profile_pic", file);
    }
  };

  const handleFormSubmit = async (data: AboutClientFormSchema) => {
    // console.log("formData", data);

    try {
      const formData = new FormData();

     
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("country_code", data.country_code);
      formData.append("company", data.company);
      formData.append("position", data.position);

   
      formData.append("profile_pic", data.profile_pic);

      // Append _method as PATCH since multipart form-data doesn't support PATCH or PUT
      formData.append("_method", "PATCH");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}api/clients/${userId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );


      if (!response.ok) {
        const errorData = await response.json();
        
        toast({
          title: "Error!",
          description: errorData.message,  
          duration: 1000,
          
        });
        return errorData.message || "Failed to update client";
      }

      const result = await response.json();
      // console.log("Client updated successfully:", result);

      toast({
        title: "Success!",
        description: "Client Updated successfully.",
        duration: 1000,
      });
    
    } catch (err) {
      // console.error("An error occurred:", err);
      toast({
        title: "Error!",
        description: "Something Went wrong updating Client",  
        duration: 1000,
        
      });

      
    }
  };





  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="flex flex-row items-center gap-4">
        <div>
          {image ? (
            <div
              className=" rounded-full w-12 h-12 flex justify-center items-center"
              style={{ border: "1px solid black" }}
            >
              <Image src={image} alt="uploaded" width={30} height={30} />
            </div>
          ) : (
            <div
              className="rounded-full w-12 h-12 bg-grey-200 text-xs flex justify-center items-center text-center"
              style={{ border: "1px solid black" }}
            >
              No Image
            </div>
          )}
        </div>
        <label className="flex flex-row justify-center items-center gap-2 text-black px-2 py-1 rounded text-sm cursor-pointer">
          <Upload />
          Upload Photo
          <input
            type="file"
            // name="profile_pic"
            {...register("profile_pic")}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        {errors.profile_pic && (
          <span className="text-red-600">{errors.profile_pic.message}</span>
        )}
      </div>

      <div className="flex flex-row justify-start items-center gap-24">
        <div className="flex flex-col justify-center items-start gap-4">
          <Label htmlFor="first_name" className="text-right">
            Firstname
          </Label>
          <Input
            id="first_name"
            {...register("first_name")}
            // name="first_name"
            // value={formData.first_name}
            // onChange={handleInputChange}
            className="col-span-3"
            placeholder="First name"
          />
          {errors.first_name && (
            <span className="text-red-600">{errors.first_name.message}</span>
          )}
        </div>

        <div className="flex flex-col justify-center items-start gap-4">
          <Label htmlFor="last_name" className="text-right">
            Lastname
          </Label>
          <Input
            id="last_name"
            {...register("last_name")}
            // name="last_name"
            // value={formData.last_name}
            // onChange={handleInputChange}
            className="col-span-3"
            placeholder="Last name"
          />
          {errors.last_name && (
            <span className="text-red-600">{errors.last_name.message}</span>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex flex-col justify-center items-start gap-4">
          <Label htmlFor="email" className="text-left">
            Email
          </Label>
          <Input
            id="email"
            {...register("email")}
            // name="email"
            // value={formData.email}
            // onChange={handleInputChange}
            placeholder="email@example.com"
          />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
        </div>

        {/* <div className="flex flex-col justify-center items-start gap-4">
          <Label htmlFor="country_code" className="text-left">
            Country code
          </Label>
          <Input
            id="country_code"
            {...register("country_code")}
            // name="country_code"
            // value={formData.country_code}
            // onChange={handleInputChange}
            placeholder="+1234567890"
          />
          {errors.country_code && (
            <span className="text-red-600">{errors.country_code.message}</span>
          )}
        </div>

        <div className="flex flex-col justify-center items-start gap-4">
          <Label htmlFor="phone" className="text-left">
            Phone
          </Label>
          <Input
            id="phone"
            {...register("phone")}
            // name="phone"
            // value={formData.phone}
            // onChange={handleInputChange}
            placeholder="+1234567890"
          />
          {errors.phone && (
            <span className="text-red-600">{errors.phone.message}</span>
          )}
        </div> */}

        <div className="flex justify-start items-center gap-4 w-full">
          <div className="flex-1">
            <Label htmlFor="phone" className="text-left">
              Phone
            </Label>
            <PhoneInput
              country={"us"} // Default country
              inputProps={{
                name: "phone",
                id: "phone",
                required: true,
              }}
              containerStyle={{ width: "100%" }}
              inputStyle={{ width: "100%" }}
              onChange={(value, countryData) => {
                // console.log("Raw value from PhoneInput", value);
                // console.log("Country Data", countryData); // Ensure this logs correctly
                
                // Check if countryData and dialCode exist
                const countryCode = countryData?.dialCode || "No dial code found";
                const phoneNumber = value.replace(`+${countryCode}`, "");
                // console.log("Phone number without country code", phoneNumber);
    
             
                setValue("country_code", countryCode, { shouldValidate: true });
                setValue("phone", phoneNumber, { shouldValidate: true });
    
                trigger(["country_code", "phone"]);
              }}
            />
            {errors.phone && (
              <span className="text-red-600">{errors.phone.message}</span>
            )}
            {errors.country_code && (
              <span className="text-red-600">
                {errors.country_code.message}
              </span>
            )}

            
          </div>
        </div>

        <div className="flex flex-col justify-center items-start gap-4">
          <Label htmlFor="company" className="text-left">
            Company
          </Label>
          <Input
            id="company"
            {...register("company")}
            // name="company"
            // value={formData.company}
            // onChange={handleInputChange}
            placeholder="Company"
          />
          {errors.company && (
            <span className="text-red-600">{errors.company.message}</span>
          )}
        </div>

        <div className="flex flex-col justify-center items-start gap-4">
          <Label htmlFor="position" className="text-left">
            Position
          </Label>
          <Input
            id="position"
            {...register("position")}
            // name="position"
            // value={formData.position}
            // onChange={handleInputChange}
            placeholder="Position"
          />
          {errors.position && (
            <span className="text-red-600">{errors.position.message}</span>
          )}
        </div>
      </div>

      <Button type="submit">Save Changes</Button>
    </form>
  );
};

export default AboutClient;
