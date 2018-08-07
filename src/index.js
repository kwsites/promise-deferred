
export default function deferred () {

   const api = {
      done: undefined,
      fail: undefined,
   };

   api.promise = new Promise((_done, _fail) => {
      api.done = _done;
      api.fail = _fail;
   });

   return api;
}
