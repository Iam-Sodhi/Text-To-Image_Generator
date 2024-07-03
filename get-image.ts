// "use server"
// interface GetChapterProps {
//   prompt: string
// };

// export const getImage = async ({
//      prompt
// }: GetChapterProps) => {
//     const token="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";
//     try {
//         const input = prompt;
//         const response = await fetch(
//           "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//             method: "POST",
//             body: JSON.stringify({ "inputs": input }),
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to generate image");
//         }
//         console.log("response",response);
//         const blob = await response.blob();
//         const url=URL.createObjectURL(blob);
//         console.log("blob_URL:  ",url);

//     return {
//       url,
//        };
//   } catch (error) {
//     return {
//       url: null,
//     }
//   }
// }