export type CaptureData = {
  uri: string;
  name: string;
  imageName: string;
  // Android only
  id?: string;
  path?: string;
  height?: number;
  width?: number;
  // iOS only
  size?: number;
};
