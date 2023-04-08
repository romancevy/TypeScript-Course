
  //* Creating & Using an "Autobind" Decorator
  export function Autobind(
    _: any, // target - wird nicht verwendet
    _2e: string, // methodName - wird nicht verwendet
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    //   console.log(originalMethod);
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  }

