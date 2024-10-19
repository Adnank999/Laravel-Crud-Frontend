import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { boolean, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import validator from "validator";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";

const formSchema = z.object({
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

export type FormSchema = z.infer<typeof formSchema>;

interface Props {
  onSubmit: (data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country_code: string;
    company: string;
    position: string;
  }) => Promise<null>;
}

export function AddClientModal({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const formSubmit = async (data: FormSchema) => {
    try {
      const error = await onSubmit(data);

      if (error) {
        toast({
          title: "Error!",
          description: error,
          duration: 1000,
        });
      } else {
        toast({
          title: "Success!",
          description: "Client added successfully.",
          duration: 1000,
        });

        setOpen(false);
      }
    } catch (err) {
      console.error("An error occurred:", err);

      toast({
        title: "Error!",
        description: err.message || "An unknown error occurred.",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black">Add Client</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:max-w-[600px] lg:max-w-[600px] max-h-[100vh] overflow-y-auto py-4">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
        </DialogHeader>

        {/* Form starts here */}
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-4 ">
          <div className="flex flex-row justify-start items-center gap-24">
            <div className="flex flex-col justify-center items-start gap-4">
              <Label htmlFor="first_name" className="text-right">
                Firstname
              </Label>
              <Input
                id="first_name"
                {...register("first_name")}
                className="col-span-3"
                placeholder="First name"
              />
              {errors.first_name && (
                <span className="text-red-600">
                  {errors.first_name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col justify-center items-start gap-4">
              <Label htmlFor="last_name" className="text-right">
                Lastname
              </Label>
              <Input
                id="last_name"
                {...register("last_name")}
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
                placeholder="email@example.com"
              />
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
            </div>
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
                    const countryCode =
                      countryData?.dialCode || "No dial code found";
                    const phoneNumber = value.replace(`+${countryCode}`, "");
                    // console.log(
                    //   "Phone number without country code",
                    //   phoneNumber
                    // );

                    setValue("country_code", countryCode, {
                      shouldValidate: true,
                    });
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
                placeholder="Position"
              />
              {errors.position && (
                <span className="text-red-600">{errors.position.message}</span>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Client</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
