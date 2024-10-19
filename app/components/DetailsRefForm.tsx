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
import { Textarea } from "@/components/ui/textarea";

const editDetailsReferenceFormSchema = z.object({
details: z.string().min(1, "Details required"),
reference: z.string().min(1, "Please Choose the Reference"),

});

export type DetailsClientFormSchema = z.infer<typeof editDetailsReferenceFormSchema>;
interface Props {
  userId: number;
}
const DetailsRefForm = ({ userId }: Props) => {
  
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<DetailsClientFormSchema>({
    resolver: zodResolver(editDetailsReferenceFormSchema),
  });


  const { toast } = useToast();
  const onSubmit = async (data: DetailsClientFormSchema) => {
    // console.log("Final data:", data);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}api/clientsDetailsReference/${userId}`,
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
      <Label htmlFor="details">Details</Label>
      <Textarea
        id="details"
        placeholder="Enter a description"
        {...register("details")}
        rows={6} 
      />
      {errors.details && (
        <span className="text-red-600">{errors.details.message}</span>
      )}
    </div>

   
    <div className="flex flex-col gap-2">
      <Label htmlFor="reference">Reference</Label>
      <select
        id="reference"
        {...register("reference")}
        className="border rounded-md p-2"
      >
        <option value="">Select Reference</option>
        <option value="facebook">Facebook</option>
        <option value="whatsapp">WhatsApp</option>
        <option value="messenger">Messenger</option>
      </select>
      {errors.reference && (
        <span className="text-red-600">{errors.reference.message}</span>
      )}
    </div>

  
    <Button type="submit" className="mt-4">
      Save Changes
    </Button>
  </form>
  );
};

export default DetailsRefForm;
