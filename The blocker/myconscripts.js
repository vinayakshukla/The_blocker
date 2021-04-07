

// let ele=document.createElement("div");
// ele.setAttribute("id","timerp")
// ele.innerText="Time Left=";

// let temp=document.createElement("span");
// temp.setAttribute("id","timer")
// ele.appendChild(temp);

// let bo=document.getElementsByTagName("body")[0];
// bo.insertBefore(ele,bo.firstChild);

// document.getElementById("timerp").style.zIndex = "4";
// document.getElementById("timerp").style.position="fixed" 
// document.getElementById('timer').innerHTML =
//   3+ ":" + 20;







// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
 
//     if(changeInfo.status=="complete"){
//         chrome.storage.sync.get(['blocklist'],function(result){
//             let bookList=result.blocklist;
//             if(bookList!=undefined)
//             for (index = 0; index < bookList.length; index++) { 
//              if(statusText.localeCompare(bookList[index].name)==0)
//              {
//                       console.log("starting the count down");
//                       countD(bookList[index].time);

//              }
//     }
// }); 
//     }


// });


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
          countD(request.time);
        sendResponse({farewell: "goodbye"});
    }
  );



function countD(count){
  if(document.getElementById("timerp")==null){
let ele=document.createElement("div");
ele.innerText="Time Left=";
ele.setAttribute("id","timerp")

let temp=document.createElement("span");
temp.setAttribute("id","timer")
ele.appendChild(temp);

let bo=document.getElementsByTagName("body")[0];
bo.insertBefore(ele,bo.firstChild);

document.getElementById("timerp").style.zIndex = "4";
document.getElementById("timerp").style.position="fixed"
document.getElementById('timer').innerHTML =
  count + ":" + 2;
startTimer();
  }
}
function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  if(m<0){alert('timer completed')
         return;}
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  console.log(m)
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}