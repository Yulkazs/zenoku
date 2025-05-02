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
  
    export function stagger(value: number | string, options?: StaggerParams): Function;
    export function animate(params: AnimeParams): AnimeInstance;
    
    export let speed: number;
    export let running: any[];
  
    export function remove(targets: any): void;
    export function get(targets: any, prop: string): any;
    export function set(targets: any, props: any): void;
    export function random(min: number, max: number): number;
    export function timeline(params?: AnimeParams | null): AnimeInstance;
  }