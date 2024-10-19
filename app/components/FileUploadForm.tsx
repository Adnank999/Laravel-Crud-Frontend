import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ShowUploadFile from "./ShowUploadFile";
import { useState } from "react";

interface ClientFileFormSchema {
  shared_file: File | null;
}

interface Props {
  userId: number;
}

const FileUploadForm = ({ userId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFileFormSchema>();
  const { toast } = useToast();

  const [success,setSuccess] = useState<boolean>(false);

  const onSubmit = async (data: ClientFileFormSchema) => {
    const formData = new FormData();

    if (data.shared_file && data?.shared_file[0]) {
      formData.append("shared_file", data?.shared_file[0]);
    }

    // formData.append("_method", "PATCH");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}api/clients/sharedFiles/${userId}`,
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
        return;
      }

      const result = await response.json();
      toast({
        title: "Success!",
        description: "File uploaded successfully.",
        duration: 1000,
      });

      setSuccess(true);

      // console.log("Uploaded file path:", result.file_path); 
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error!",
        description: "There was an error uploading the file.",
        duration: 1000,
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-start gap-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row justify-start items-end gap-4"
        encType="multipart/form-data"
      >
        <div className="flex flex-col justify-start items-start gap-2">
         
          <Input
            type="file"
            id="shared_file"
            accept=".pdf"
            {...register("shared_file", { required: true })}
            className="cursor-pointer"
           

          />
          {errors.shared_file && (
            <span className="text-red-600">Please upload a PDF file.</span>
          )}
        </div>

        <Button type="submit" className="w-[20%]">Upload File</Button>
      </form>

      <ShowUploadFile userId={userId} success={success} setSuccess={setSuccess}/>
    </div>
  );
};

export default FileUploadForm;
