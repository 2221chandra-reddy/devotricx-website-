export type ServiceVideoKey =
  | "2d-animation"
  | "3d-animation"
  | "vr-ar"
  | "web-solutions"
  | "e-learning"
  | "2d-3d-animation";

export type ServiceVideo = {
  key: ServiceVideoKey;
  title: string;
  src: string;
};

export const serviceVideos: Record<ServiceVideoKey, ServiceVideo> = {
  "2d-animation": {
    key: "2d-animation",
    title: "2D Animation",
    src: "/videos/2d-animation.mp4",
  },
  "3d-animation": {
    key: "3d-animation",
    title: "3D Animation",
    src: "/videos/3d-animation.mp4",
  },
  "2d-3d-animation": {
    key: "2d-3d-animation",
    title: "2D & 3D Animation",
    src: "/videos/3d-animation.mp4",
  },
  "vr-ar": {
    key: "vr-ar",
    title: "VR / AR",
    src: "/videos/vr-ar.mp4",
  },
  "web-solutions": {
    key: "web-solutions",
    title: "Web Solutions",
    src: "/videos/web-solutions.mp4",
  },
  "e-learning": {
    key: "e-learning",
    title: "e-Learning",
    src: "/videos/e-learning.mp4",
  },
};

export const heroServiceButtons: { label: string; videoKey: ServiceVideoKey }[] = [
  { label: "2D Animation", videoKey: "2d-animation" },
  { label: "3D Animation", videoKey: "3d-animation" },
  { label: "VR / AR", videoKey: "vr-ar" },
  { label: "Web Solutions", videoKey: "web-solutions" },
  { label: "e-Learning", videoKey: "e-learning" },
];
