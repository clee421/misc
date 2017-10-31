// Throttling
const doMassiveWork = () => {
  let allow = true;
  return () => {
    if (allow) {
      allow = false;
      console.log('doing that massive work');
      setTimeout(()=> {
        allow = true;
        console.log('allow work again');
      }, 500);
    }
  };
};

const massiveWork = doMassiveWork();
for(let t = 1; t <= 1000; t++) {
  setTimeout(massiveWork, t * 50);
}