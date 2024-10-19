import { useShowSharedPdfStore } from "@/store/useShowSharedPdfStore";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo } from "react";
import pdf from "../../public/pdf.png";
interface Props {
  userId: number;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>
}
const ShowUploadFile = ({ userId,success,setSuccess }: Props) => {
  const { sharedFiles, setSharedFiles } = useShowSharedPdfStore();

  const fetchFilePath = async (userId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}api/clients/getSharedFiles/${userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching file path:", errorData.message);
        return;
      }

      const result = await response.json();
      // console.log("File Path:", result.data.shared_files);
      setSharedFiles(result.data.shared_files);
    } catch (error) {
      console.error("Error fetching file path:", error);
    }
  };

  useEffect(() => {
    fetchFilePath(userId);
  }, [userId]);

 
  useEffect(() => {
    if (success) {
      fetchFilePath(userId);
      setSuccess(false);
    }
  }, [success, userId, setSuccess]);


  return (
    <div className="w-full">
      <ul className="flex flex-col justify-start items-start gap-4 w-full">
        {sharedFiles.length > 0 ? (
          sharedFiles.map((file, index) => (
            <li
              key={index}
              className="flex flex-row justify-between items-center w-full"
            >
              <div className="flex flex-row justify-start items-center gap-2">
                <Link
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row justify-start items-center gap-2"
                >
                  <Image src={pdf} width={30} height={30} alt="pdfImage" />
                  <p>{file.split("/").pop()}</p>
                </Link>
              </div>
              <div className="text-right font-bold">...</div>{" "}
             
            </li>
          ))
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </ul>
    </div>
  );
};

export default ShowUploadFile;
