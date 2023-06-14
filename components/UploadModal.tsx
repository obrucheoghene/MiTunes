"use client"
import useUploadModal from "@/hooks/useUploadModal"
import Modal from "./Modal"
import uniqid from "uniqid"
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { appwriteWebClientDatabases, appwriteWebClientStorage } from "@/libs/appwriteWeb";
import { appwriteConfig } from "@/libs/configs";
import { ID } from "appwrite";
import { getImageURL, getSongURL } from "@/libs/helpers";

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false)
  const { databaseId, songsCollectionId, songsBucketId, imagesBucketId } = appwriteConfig
  const router = useRouter()
  const { user } = useUser();

  interface UploadFormValues {
    author: string,
    title: string,
    song: FileList | null,
    image: FileList | null,
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UploadFormValues>({
    defaultValues: {
      author: user?.fullname,
      title: '',
      song: null,
      image: null,
    }
  })
  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      uploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<UploadFormValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0]
      const songFile = values.song?.[0]
      if (!imageFile || !songFile || !user) {
        return
      }
      const uniqueID = uniqid();

      const songUploadResponse = await appwriteWebClientStorage.createFile(songsBucketId, uniqueID, songFile)
      const imageUploadResponse = await appwriteWebClientStorage.createFile(imagesBucketId, uniqueID, imageFile)

      const response = await appwriteWebClientDatabases.createDocument(databaseId, songsCollectionId, ID.unique(), {
        title: values.title,
        author: values.author,
        songPath: getSongURL(songUploadResponse.$id),
        imagePath: getImageURL(imageUploadResponse.$id),
        userId: user.id
      })
      toast.success('Song has been uploaded')
      reset()
      uploadModal.onClose()
      router.refresh();

    } catch (error) {
      toast.error('Upload failed: Something went wrong')
    } finally {
      setIsLoading(false)
    }

  }
  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}>
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-y-4 overflow-y-auto">
        <div>
          <div className="pb-1">
            Song title
          </div>
          <Input
            id="title"
            disabled={isLoading}
            {...register('title', { required: true })}
            placeholder="Song title"
          />
          {errors?.title && <span className="text-red-600">Title is required</span>}

        </div>
        <div>
          <div className="pb-1">
            Author
          </div>
          <Input
            id="author"
            disabled={isLoading}
            value={user?.fullname}
            {...register('author', { required: true })}
            placeholder="Song author"
          />
          {errors?.title && <span className="text-red-600">Author is required</span>}

        </div>

        <div>
          <div className="pb-1">
            Select a song file
          </div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: true })}

          />
          {errors?.song && <span className="text-red-600">Song is required</span>}

        </div>
        <div>
          <div className="pb-1">
            Select an image
          </div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}

          />
          {errors?.image && <span className="text-red-600">Image is required</span>}

        </div>

        <Button disabled={isLoading} type="submit" className=" rounded-md text-white ">
          {isLoading ? 'Uploading...' : 'Upload'}
          
        </Button>
      </form>
    </Modal>
  )
}

export default UploadModal