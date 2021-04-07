function getCurrentTabUrl(callback) {  
    var queryInfo = {
      active: true, 
      currentWindow: true,
      windowId: chrome.windows.WINDOW_ID_CURRENT
    };
  
    chrome.tabs.query(queryInfo, function(tabs) {
      var tab = tabs[0]; 
      console.log(tab.id);
      var url = tab.url;
       var idi=tab.id
      callback(url,idi);
    });

       
  }
  
  function renderURL(statusText,id) {
    console.log(statusText);
    chrome.storage.sync.get(['blocklist'],function(result){
         let bookList=result.blocklist;
         if(bookList!=undefined)
         for (index = 0; index < bookList.length; index++) { 
          if(statusText.localeCompare(bookList[index])==0)
          {
            chrome.tabs.remove(id);
            break;
          } 
      }   
       
    })
    
  }
//   let blockObj={ name:"abc", time:0};
//   let blockListt=[];
//   blockListt.push(blockObj)
//   chrome.storage.sync.set({'blocklist':blockListt},function(){});
//   chrome.storage.sync.get(['blocklist'],function(result){
//       console.log(result);
//   });
  
//   document.addEventListener('DOMContentLoaded', function() {
//     chrome.storage.sync.get(['blocklist'], function(result) {});
//     // {let blockList=[];
//     //   chrome.storage.sync.set({'blocklist':blockList},function(){});
//     // }

//     //-------------------------CODE TO BLOCK A WEBSITE----------------------------
//     // getCurrentTabUrl(function(url,id) {
//     //   renderURL(url,id); 
//     // });
//     //---------------------------------------------------------------------------
//   });

  document.getElementById("nameIT").addEventListener('input',function(e){
  
    getCurrentTabUrl(function(url,id) {
      renderURL(url,id); 
    });
    
  });
document.getElementById("submit").addEventListener('click',function(){
 
    let blockList=[];
    chrome.storage.sync.get(['blocklist'],function(result){
      blockList=result.blocklist;
      let namee=document.getElementById("nameIT").value;
      let timee=document.getElementById("time").value;
      let blockObj={ name:namee, time:timee};
       
      console.log(result.blocklist);
    blockList.push(blockObj);
    chrome.storage.sync.set({'blocklist':blockList},function(){});
    document.getElementById("nameIT").value="";
    document.getElementById("time").value="";

});

});

