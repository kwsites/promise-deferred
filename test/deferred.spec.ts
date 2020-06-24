import deferred from '../src';

describe('deferred', () => {

   it('creates a PromiseLike', async () => {
      const {promise, fulfilled, status} = deferred();
      expect(promise).toEqual(expect.objectContaining({
         catch: expect.any(Function),
         then: expect.any(Function),
      }));

      expect(status).toBe('pending');
      expect(fulfilled).toBe(false);
   });

   it('can be resolved', async () => {
      const def = deferred();
      def.done('abc');

      expect(def.status).toBe('resolved');
      expect(def.fulfilled).toBe(true);
      expect(await def.promise).toBe('abc');
   });

   it('can be rejected', async () => {
      const error = new Error('abc');
      const def = deferred();
      def.fail(error);

      expect(def.status).toBe('rejected');
      expect(def.fulfilled).toBe(true);
      expect(await (def.promise.catch(e => e))).toBe(error);
   });

   it('once resolved, cannot be re-fulfilled', async () => {
      const def = deferred();
      def.done('a');
      def.fail(new Error(''));

      expect(def.fulfilled).toBe(true);
      expect(def.status).toBe('resolved');
   });

   it('once rejected, cannot be re-fulfilled', async () => {
      const def = deferred();
      def.fail(new Error(''));
      def.done('a');

      expect(def.fulfilled).toBe(true);
      expect(def.status).toBe('rejected');
   });

})
