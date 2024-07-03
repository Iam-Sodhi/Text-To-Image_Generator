"use client";

import * as z from "zod";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { formSchema } from "./constants";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import Empty from "@/components/Empty";
// import { getImage } from "@/get-image";

const PhotoPage = () => {
  const router = useRouter();
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const token="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";
    try {
      const input = values.prompt;
      setLoading(true);
      // const result: any = await getImage({ prompt: input });
      // setOutput(result.url);
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ "inputs": input }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to generate image");
      }
      console.log("response",response);
      const blob = await response.blob();
      const url=URL.createObjectURL(blob);
      setOutput(URL.createObjectURL(blob));
      console.log("blob_URL:  ",url);
       
    } catch (error: any) {
      console.error("Error generating image: ", error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
              rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-8
              gap-2
            "
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="A picture of a horse in Swiss alps"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              Generate
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {!output && !isLoading && <Empty label="No images generated." />}
        {output && (
          <div className="grid grid-cols-1 sm:grid-cols-3  gap-4 mt-8">
            <Card key={output} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image fill alt="Generated" src={output} />
              </div>
              <CardFooter className="p-2">
                <Button
                  onClick={() => window.open(output)}
                  variant="secondary"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoPage;
