/**
 * The `DeferredPromise` has a `promise` property in an initially pending state,
 * that will be resolved when the `done` method is called or rejected when the
 * `fail` method is called.
 */
export interface DeferredPromise<RESOLVES = any, REJECTS extends Error = Error> {
   done (result: RESOLVES): void;
   fail (error: REJECTS): void;
   readonly status: DeferredPromiseStatus;
   readonly fulfilled: boolean;
   promise: Promise<RESOLVES>;
}

/**
 * The three states the DeferredPromise can be in - initially pending then either
 * resolved or rejected when it is fulfilled.
 */
export type DeferredPromiseStatus = 'pending' | 'resolved' | 'rejected';

/**
 * Creates a new `DeferredPromise`
 */
export function deferred<T = any, E extends Error = Error> (): DeferredPromise<T, E> {
   let done: (result: T) => void;
   let fail: (error: E) => void;
   let status: DeferredPromiseStatus = 'pending';

   const promise: Promise<T> = new Promise<T>((_done, _fail) => {
      done = _done;
      fail = _fail;
   });

   return {
      promise,
      done (result) {
         if (status === 'pending') {
            status = 'resolved';
            done(result);
         }
      },
      fail (error) {
         if (status === 'pending') {
            status = 'rejected';
            fail(error);
         }
      },
      get fulfilled () {
         return status !== 'pending';
      },
      get status () {
         return status;
      },
   };
}

export default deferred;
