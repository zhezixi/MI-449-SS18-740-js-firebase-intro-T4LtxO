// TODO Sign into the database anonymously

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDLc5NwxELqhuKrrf5TdazS9wdoO7KOdAI",
  authDomain: "woofer-3ff8c.firebaseapp.com",
  databaseURL: "https://woofer-3ff8c.firebaseio.com",
  projectId: "woofer-3ff8c",
  storageBucket: "",
  messagingSenderId: "1020165695858"
}

firebase.initializeApp(config)

firebase.auth().signInAnonymously()

var getTime = new Date().getTime()

// CREATE a new woof in Firebase
function createWoofInDatabase (woof) {
  // TODO create a new record in Firebase
  firebase.database().ref('woofs').push(woof)
}

// READ from Firebase when woofs are added, changed, or removed
// Write a function for each 'on' method and call addWoofRow,
// updateWoofRow, and deleteWoofRow to update the page. Make
// sure to pass the right parameters (hint: these functions are
// defined in woofer-ui.js).
function readWoofsInDatabase () {
  // TODO read new, changed, and deleted Firebase records
  // added woof
  firebase.database().ref('woofs').on('child_added', function (addNewSnap) {
    addWoofRow(addNewSnap.key, addNewSnap.val())
  })

  // changed woof
  firebase.database().ref('woofs').on('child_changed', function (updateSnap) {
    updateWoofRow(updateSnap.key, updateSnap.val())
  })

  // deleted woof
  firebase.database().ref('woofs').on('child_removed', function (deletedsnap) {
    deleteWoofRow(deletedsnap.key)
  })
}

// UPDATE the woof in Firebase
function updateWoofInDatabase (woofKey, woofText) {
  // TODO update the record in Firebase
  firebase.database().ref('woofs').child(woofKey).child('text').set(woofText)
}

// DELETE the woof from Firebase
function deleteWoofFromDatabase (woofKey) {
  // TODO delete the record from Firebase
  firebase.database().ref('woofs').child(woofKey).remove()
}

// Load all of the data
readWoofsInDatabase()
