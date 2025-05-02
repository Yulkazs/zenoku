declare module 'animejs' {
    namespace anime {
      interface AnimeParams {
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
  
      interface staggerParams {
        grid?: number[]; 
        axis?: string;
        from?: string | number | any;
        start?: number;
        direction?: string;
        easing?: string | Function;
      }
  
      interface AnimeInstance {
        play(): void;
        pause(): void;
        restart(): void;
        reverse(): void;
        seek(time: number): void;
        [method: string]: any;
      }
  
      function stagger(value: number | string, options?: staggerParams): Function;

      let speed: number;
      let running: any[];

      function remove(targets: any): void;
      function get(targets: any, prop: string): any;
      function set(targets: any, props: any): void;
      function random(min: number, max: number): number;
      function timeline(params?: AnimeParams | null): AnimeInstance;
    }
  
    function anime(params: anime.AnimeParams): anime.AnimeInstance;
    export = anime;
  }
  