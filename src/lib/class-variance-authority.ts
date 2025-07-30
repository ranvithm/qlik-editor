// Simple implementation of class-variance-authority for our use case
export type VariantProps<T> = T extends (...args: any[]) => any
  ? Parameters<T>[0]
  : never;

export const cva = (base: string, config: any) => {
  return (props: any = {}) => {
    let classes = base;
    
    if (config.variants) {
      Object.keys(config.variants).forEach(key => {
        const variant = props[key];
        if (variant && config.variants[key][variant]) {
          classes += ' ' + config.variants[key][variant];
        }
      });
    }
    
    // Apply default variants if no variant was specified
    if (config.defaultVariants) {
      Object.keys(config.defaultVariants).forEach(key => {
        if (!(key in props) && config.variants[key] && config.variants[key][config.defaultVariants[key]]) {
          classes += ' ' + config.variants[key][config.defaultVariants[key]];
        }
      });
    }
    
    return classes;
  };
};