import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import validator from "validator";
import PhoneInput from "react-phone-input-2";

const editBillingFormSchema = z.object({
bill_to: z.string().min(3, "Billing Details required"),
tax_id: z.string().min(4, "Tax id is required"),
billing_address: z.string().min(5, "Billing address is required"),
billing_phone: z
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

    billing_email: z.string().email("Please enter a valid email address")
});

export type BillingClientFormSchema = z.infer<typeof editBillingFormSchema>;
interface Props {
  userId: number;
}
const BillingForm = ({ userId }: Props) => {
  
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<BillingClientFormSchema>({
    resolver: zodResolver(editBillingFormSchema),
  });


  const { toast } = useToast();
  const onSubmit = async (data: BillingClientFormSchema) => {
    // console.log("Final data:", data);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}api/clientsBilling/${userId}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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
     

      toast({
        title: "Success!",
        description: "Client Updated successfully.",
        duration: 1000,
      });
    } catch (error) {
      console.log("error", error);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 pr-52">

      <div className="flex flex-col gap-2">
        <Label htmlFor="bill_to">Bill To</Label>
        <Input id="bill_to" placeholder="Enter billing details" {...register("bill_to")} />
        {errors.bill_to && (
          <span className="text-red-600">{errors.bill_to.message}</span>
        )}
      </div>


      <div className="flex flex-col gap-2">
        <Label htmlFor="tax_id">Tax ID</Label>
        <Input id="tax_id" placeholder="Enter tax ID" {...register("tax_id")} />
        {errors.tax_id && (
          <span className="text-red-600">{errors.tax_id.message}</span>
        )}
      </div>

     
      <div className="flex flex-col gap-2">
        <Label htmlFor="billing_address">Billing Address</Label>
        <Input
          id="billing_address"
          placeholder="Enter billing address"
          {...register("billing_address")}
        />
        {errors.billing_address && (
          <span className="text-red-600">{errors.billing_address.message}</span>
        )}
      </div>

      <div className="flex justify-start items-center gap-4 w-full">
          <div className="flex-1">
            <Label htmlFor="phone" className="text-left">
              Phone
            </Label>
            <PhoneInput
              country={"bd"} 
              inputProps={{
                name: "phone",
                id: "phone",
                required: true,
              }}
              containerStyle={{ width: "100%" }}
              inputStyle={{ width: "100%" }}
              onChange={(value, countryData) => {
              
                
            
                const countryCode = countryData?.dialCode || "No dial code found";
                const phoneNumber = value.replace(`+${countryCode}`, "");
                // console.log("Phone number without country code", phoneNumber);
    
             
                setValue("country_code", countryCode, { shouldValidate: true });
                setValue("billing_phone", phoneNumber, { shouldValidate: true });
    
                trigger(["country_code", "billing_phone"]);
              }}
            />
            {errors.billing_phone && (
              <span className="text-red-600">{errors.billing_phone.message}</span>
            )}
            {errors.country_code && (
              <span className="text-red-600">
                {errors.country_code.message}
              </span>
            )}

            
          </div>
        </div>

    
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="Enter email address" {...register("billing_email")} />
        {errors.billing_email && (
          <span className="text-red-600">{errors.billing_email.message}</span>
        )}
      </div>

    
      <Button type="submit" className="mt-4 w-[30%]">
        Save changes
      </Button>
    </form>
  );
};

export default BillingForm;
