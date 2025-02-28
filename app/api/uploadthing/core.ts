
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getCurrentUser  } from "@/lib/session";
import { NextResponse } from "next/server";

const f = createUploadthing();
 
export const ourFileRouter = {
  imageUploader: f({ 
    image: { maxFileSize: "10MB", maxFileCount: 10 } 
  })
    .middleware(async (req) => {
      // Authenticate the user here
      const user = await getCurrentUser();
      
      if (!user) throw new Error("Unauthorized");
      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Optional: do something with the upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),

  videoUploader: f({ 
    video: { maxFileSize: "100MB", maxFileCount: 5 } 
  })
    .middleware(async (req) => {
      const user = await getCurrentUser();
      
      if (!user) throw new Error("Unauthorized");
      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),

  audioUploader: f({ 
    audio: { maxFileSize: "50MB", maxFileCount: 5 } 
  })
    .middleware(async (req) => {
      const user = await getCurrentUser();
      
      if (!user) throw new Error("Unauthorized");
      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),

  documentUploader: f({ 
    pdf: { maxFileSize: "20MB", maxFileCount: 5 },
    text: { maxFileSize: "20MB", maxFileCount: 5 },
    blob: { maxFileSize: "20MB", maxFileCount: 5 }
  })
    .middleware(async (req) => {
      const user = await getCurrentUser();
      
      if (!user) throw new Error("Unauthorized");
      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;