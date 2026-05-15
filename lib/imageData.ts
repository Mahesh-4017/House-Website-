export type Section = {
  id: string;
  title: string;
  folder: string;
  count: number;
};

export const sections: Section[] = [
  { id: "bathroom", title: "Luxury Bathroom", folder: "/ezgif-1-jpg", count: 24 },
  { id: "bedroom", title: "Master Bedroom", folder: "/ezgif-2-jpg", count: 24 },
  { id: "poolside", title: "Pool & Exterior", folder: "/ezgif-3-jpg", count: 32 },
  { id: "living", title: "Living Room", folder: "/ezgif-4-jpg", count: 24 },
];

/**
 * Generates an array of image paths for a given folder.
 * Matches the ezgif-frame-001.jpg naming convention.
 */
export function getImages(folder: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const num = String(i + 1).padStart(3, "0");
    return `${folder}/ezgif-frame-${num}.jpg`;
  });
}
