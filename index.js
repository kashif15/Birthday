
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
  import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

  const appSettings = {
      databaseURL: "https://adil-1b07c-default-rtdb.firebaseio.com/"
  }

  const app = initializeApp(appSettings);
  const database = getDatabase(app);
  const bdayWishInDB = ref(database, "bdayWish");


  var nameInput = document.getElementById('nameInput');
  var messageInput = document.getElementById('messageInput');
  var submitButton = document.getElementById('submitButton');

  
  var messageList = document.getElementById('messageList');

 
  submitButton.addEventListener('click', function() {
    var name = nameInput.value;
    var message = messageInput.value;

    var inputValue = name + ": " + message;
    push(bdayWishInDB, inputValue);
    
    clearInputFieldEl();
    
  });


  onValue(bdayWishInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
    
        clearMsgListEl();
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToMsgListEl(currentItem)
        }    
    } else {
        messageList.innerHTML = "No items here... yet"
    }
  });


  function clearMsgListEl()
  {
    messageList.innerHTML = "";
  }


  function clearInputFieldEl() {
   nameInput.value = '';
   messageInput.value = '';
}

  function appendItemToMsgListEl(item) {
    let itemID = item[0];
    let itemValue = item[1];
    
    let newEl = document.createElement("li")
     newEl.className = 'message-item';
    
    newEl.textContent = itemValue;
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `bdayWish/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    });
    
    messageList.append(newEl)
}
