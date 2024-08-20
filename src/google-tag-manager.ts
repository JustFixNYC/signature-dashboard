export interface GTMDataLayer {
  push(params?: { event: string; [key: string]: unknown }): void;
}

declare global {
  interface Window {
    /**
     * A reference to the dataLayer global object, provided by the GTM snippet.
     *
     * However, it won't exist if the app hasn't been configured to support GTM.
     */
    dataLayer: GTMDataLayer | undefined;
  }
}

/** Data layer event to send with optional params */
export type GTMDataLayerObject = {
  event: string;
  params?: {
    [key: string]: unknown;
  };
};

export function getDataLayer(): GTMDataLayer {
  return window.dataLayer || [];
}
