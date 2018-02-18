import axios from 'axios';
// This is the action creator. It's made up
// of two parts. The function is the creator
// of the action and the return attribute is
// the actual action.
// export function selectCounter(counter) {
//   return {
//     // type of action occurred
//     type: 'COUNTER_SELECT',
//     payload: counter,
//   };
// };

export function getAnnotation() {
  // console.log('actionCalled')
  
  return {
    // type: 'COUNTER_LOADED',
    type: 'ANNOTATION_LOADED',
    payload: new Promise((resolve, reject) => {
      // setTimeout(() => {
        axios.get('/api/search').then(response => {
          const { data } = response;
          // console.log('response data: ', data)
          resolve(data);
        });
      // }, 2000);
    })
  };
}
