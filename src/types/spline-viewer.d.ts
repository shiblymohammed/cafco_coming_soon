/// <reference types="react" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        url: string;
        "mouse-controls"?: boolean;
        "touch-controls"?: boolean;
        "wheel-controls"?: boolean;
      };
    }
  }
}
