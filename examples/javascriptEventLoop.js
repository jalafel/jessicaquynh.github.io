var sharedValue = 0;

function callBack() {
  sharedValue = 1;
  console.log(`This callback transforms sharedValue: ${sharedValue}`);
}

function eventA(callback) {
  console.log(`Event A; sharedValue: ${sharedValue}`);
  callback();
}

function eventB() {
  console.log(`Event B; sharedValue: ${sharedValue}`);
}

function eventC() {
  console.log(`Event C; sharedValue: ${sharedValue}`);
}

function noTimeout() {
  console.log(`====== No Timeout =========`);
  eventA(callBack);
  eventB();
  eventC();
}

function hasTimeout() {

  var cb = function cb() {
    setTimeout(function(){
      callBack();
    },0)
  }
  sharedValue = 0;
  console.log(`====== Has Timeout ========`);
  eventA(cb);
  eventB();
  eventC();

}

noTimeout();
hasTimeout();