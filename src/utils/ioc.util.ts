import { Container, ContainerModule, interfaces } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';
import 'reflect-metadata';
import { useMemo } from 'react';

const container = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

const provide = {
  singleton: () => (target: any) =>
    fluentProvide(target)
      .inSingletonScope()
      .done()(target),

  transient: () => (target: any) =>
    fluentProvide(target)
      .inTransientScope()
      .done()(target),
};

interface IProvideSyntax {
  constraint: (bind: interfaces.Bind, target: any) => any;
  implementationType: any;
}

const PROVIDE_METADATA_KEY = 'inversify-binding-decorators:provide';

function bindToContainer(identifier: any) {
  const provideMetadata = (Reflect.getMetadata(PROVIDE_METADATA_KEY, Reflect) || []).filter(
    (metadata: IProvideSyntax) => metadata.implementationType === identifier,
  );

  if (provideMetadata.length === 0) {
    throw new Error(`Provided identifier isn't registered: ${identifier}`);
  }

  container.load(
    new ContainerModule(bind => {
      provideMetadata.forEach((metadata: IProvideSyntax) => metadata.constraint(bind, metadata.implementationType));
    }),
  );
}

const lazyInject = (identifier: any) => (target: any, key: string, descriptor?: any) => {
  if (!identifier) {
    throw new Error(`Incorrect identifier provided: ${identifier}`);
  }

  const isBound = container.isBound(identifier);
  if (!isBound) {
    bindToContainer(identifier);
  }

  if (descriptor) {
    descriptor.initializer = () => container.get(identifier);
  } else {
    Object.defineProperty(target, key, {
      get: () => container.get(identifier),
      enumerable: true,
    });
  }
};

function useStore<T>(identifier: interfaces.ServiceIdentifier<T>): T {
  return useMemo(() => {
    const isBound = container.isBound(identifier);
    if (!isBound) {
      bindToContainer(identifier);
    }

    return container.get(identifier);
  }, [identifier]);
}

// Add ThirdParty class to container
// decorate(injectable(), RouterStore);
// container.bind<RouterStore>(RouterStore).toSelf();

export { container, provide, lazyInject, useStore };
