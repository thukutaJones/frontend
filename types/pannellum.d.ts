declare module "pannellum" {
  interface PannellumViewer {
    loadScene: (id: string) => void;
    setYaw: (yaw: number) => void;
    getYaw: () => number;
  }

  interface ViewerConfig {
    default?: any;
    scenes: Record<string, any>;
  }

  export function viewer(containerId: string, config: ViewerConfig): PannellumViewer;
  const pannellum: {
    viewer: typeof viewer;
  };
  export default pannellum;
}
