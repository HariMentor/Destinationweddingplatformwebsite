// export const getCoverImage = (step1?: any) => {
//   const web = step1?.coverPhotosWeb?.[0]?.fileUrl;
//   const mobile = step1?.coverPhotosMobile?.[0]?.fileUrl;

//   if (typeof web === "string" && web.trim() !== "") return web;
//   if (typeof mobile === "string" && mobile.trim() !== "") return mobile;

//   return "/placeholder-venue.jpg";
// };

// In coverPhotshelper.ts
export function getCoverImage(step1: any): string | null {
  if (step1?.coverPhotosWeb?.[0]?.fileUrl) {
    return step1.coverPhotosWeb[0].fileUrl;
  }
  if (step1?.coverPhotosMobile?.[0]?.fileUrl) {
    return step1.coverPhotosMobile[0].fileUrl;
  }
  return null; // Return null instead of empty string
}
