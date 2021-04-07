
chrome.runtime.onInstalled.addListener(function(details){

  chrome.storage.sync.set({'blocklist':[]},function(){});

});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
 
    if(changeInfo.status=="complete"){
   console.log(changeInfo)
    console.log(tabId);
    console.log(tab.url);
   
      renderURL(tab.url,tabId);
    // getCurrentTabUrl(function(url,id) {
    //   renderURL(url,id); 
  //});
    }
}); 
function renderURL(statusText,id) {
    console.log(statusText);
    chrome.storage.sync.get(['blocklist'],function(result){
         let bookList=result.blocklist;
         console.log(bookList);
         if(bookList!=undefined)
         for (index = 0; index < bookList.length; index++) { 
          if(statusText.includes(bookList[index].name))
          { 
            
            
            console.log("find");


           
              chrome.tabs.sendMessage(id, {time: bookList[index].time}, function(response) {
                console.log("response from content Script"+response.farewell);
           
            });
             console.log( bookList[index].time*60000);
            console.log(bookList[index].name );
            window.setTimeout( function(){
              console.log("losing");chrome.tabs.remove(id)}, bookList[index].time*60000);
             console.log("setTimeout called");
            break;
          } 
      }   
       
    });
    
  }