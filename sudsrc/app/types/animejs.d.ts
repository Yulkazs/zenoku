declare module 'animejs' {
    export interface AnimeParams {
      targets: string | object | HTMLElement | NodeList | null;
      duration?: number;
      delay?: number | Function;
      endDelay?: number;
      easing?: string | Function;
      round?: number;
      direction?: 'normal' | 'reverse' | 'alternate';
      loop?: boolean | number;
      autoplay?: boolean;
      [property: string]: any;
    }
  
    export interface StaggerParams {
      grid?: number[]; 
      axis?: string;
      from?: string | number | any;
      start?: number;
      direction?: string;
      easing?: string | Function;
    }
  
    export interface AnimeInstance {
      play(): void;
      pause(): void;
      restart(): void;
      reverse(): void;
      seek(time: number): void;
      [method: string]: any;
    }
  
    // Export stagger and other utilities as properties of the default export
    const anime: {
      (params: AnimeParams): AnimeInstance;
      stagger(value: number | string, options?: StaggerParams): Function;
      speed: number;
      running: any[];
      remove(targets: any): void;
      get(targets: any, prop: string): any;
      set(targets: any, props: any): void;
      random(min: number, max: number): number;
      timeline(params?: AnimeParams | null): AnimeInstance;
    };
  
    export default anime;
  }