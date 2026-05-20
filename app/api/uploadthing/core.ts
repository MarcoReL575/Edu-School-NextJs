import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { requireAuth } from "@/src/lib/auth-server";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({
        image: {
        maxFileSize: "4MB",
        maxFileCount: 1,
        },
        pdf: {
            maxFileSize: "1024KB",
            maxFileCount: 5
        }
    })
    .middleware(async ({ req }) => {
        const { session } = await requireAuth();

        if (!session) throw new UploadThingError("Unauthorized");

        return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
        console.log("Upload complete for userId:", metadata.userId);
        console.log("file url", file.ufsUrl);

        return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
