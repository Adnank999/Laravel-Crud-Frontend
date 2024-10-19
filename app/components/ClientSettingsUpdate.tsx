import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePasswordStore } from "@/store/usePasswordStore";
import { Switch } from "@/components/ui/switch";

interface Props {
  userId: number;
}

const editSettingsFormSchema = z.object({
  can_access_portal: z.boolean(),
  password: z
  .string()
  .min(2, "Password must be at least 2 characters")
  .max(50)
  .optional()
  .nullable()
  .refine((value) => value === null || value!.length >= 2, {
    message: "Password must be at least 2 characters",
  }),
});

export type SettingsClientFormSchema = z.infer<typeof editSettingsFormSchema>;

const ClientSettingsUpdate = ({ userId }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SettingsClientFormSchema>({
    resolver: zodResolver(editSettingsFormSchema),
  });

  const { password, setPassword } = usePasswordStore();
  const { toast } = useToast();

 
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const newPassword = Array.from({ length: 8 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");

    setPassword(newPassword); 
    setValue("password", newPassword); 
  };

 
  const handleFormSubmit = async (data: SettingsClientFormSchema) => {
    // console.log("formData", data);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}api/clients/updateSettings/${userId}`,
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
        return;
      }

      const result = await response.json();
      toast({
        title: "Success!",
        description: "Settings updated successfully.",
        duration: 1000,
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      toast({
        title: "Error!",
        description: "There was an error updating the settings.",
        duration: 1000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="can_access_portal">Can Access Portal</Label>
        <Switch
          id="can_access_portal"
        //   checked={!!watch("can_access_portal")} 
          onCheckedChange={(checked) => setValue("can_access_portal", checked)} 
        />
        {errors.can_access_portal && (
          <span className="text-red-600">{errors.can_access_portal.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="text"
          placeholder="Enter password"
          {...register("password")}
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}
      </div>

   
        <div className="flex flex-row justify-start items-baseline gap-10">
        <Button type="button" onClick={generatePassword}>
        Generate Password
      </Button>

     
      <Button type="submit" className="mt-4">
        Save Changes
      </Button>
        </div>
     
    </form>
  );
};

export default ClientSettingsUpdate;
