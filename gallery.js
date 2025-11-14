let mCurIndx = 0; // Tracks the current image index
let mImages = []; // Array to hold GalleryImage objects
let mObject = [];
const mUrl = "images.json"; // Replace with actual JSON URL
const mWaitTime = 5000; // Timer interval in milliseconds

$(document).ready(() => {
  $(".details").hide(); // Hide details initially

  // Call a function here to start the timer for the slideshow
  startTimer();
  // Select the moreIndicator button and add a click event to:
  // - toggle the rotation classes (rot90 and rot270)
  // - slideToggle the visibility of the .details section
  $(".moreIndicator").on("click", function () {
    $(".moreIndicator").toggleClass("rot270");
    $(".details").show();
  });

  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $("#nextPhoto").on("click", function () {
    showNextPhoto();
  });
  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
  $("#prevPhoto").on("click", function () {
    showPrevPhoto();
  });
  // Call fetchJSON() to load the initial set of images
  fetchJSON();
});

// Function to fetch JSON data and store it in mImages
async function fetchJSON() {
  // Use $.ajax here to request the JSON data from mUrl
  let list = await fetch("images.json");
  list = await list.json();
  list.forEach((item) => {
    mImages.push(item.imgPath);
    mObject.push(item);
  });
  console.log(list, mImages);
  // On success, parse the JSON and push each image object into mImages array
  // After JSON is loaded, call swapPhoto() to display the first image
  swapPhoto();
}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  // Access mImages[mCurIndx] to update the image source and details
  $(`.thumbnail`).attr("src", mImages[mCurIndx]);
  const current = mObject[mCurIndx];
  console.log(current);
  // Update the #photo element's src attribute with the current image's path
  // Update the .location, .description, and .date elements with the current image's details
  $(`.location`).text(`Location: ${current.imgLocation}`);
  $(`.description`).text(`Description: ${current.description}`);
  $(`.date`).text(`${current.date}`);
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  // Increment mCurIndx and call swapPhoto()
  // Ensure it loops back to the beginning if mCurIndx exceeds array length
  mCurIndx++;
  if (mCurIndx >= 9) mCurIndx = 0;
  swapPhoto();
}

// Goes to the previous photo, loops to the last photo if mCurIndx goes negative
function showPrevPhoto() {
  // Decrement mCurIndx and call swapPhoto()
  // Ensure it loops to the end if mCurIndx is less than 0
  mCurIndx--;
  if (mCurIndx <= -1) mCurIndx = 8;
  swapPhoto();
}

// Starter code for the timer function
function startTimer() {
  // Create a timer to automatically call `showNextPhoto()` every mWaitTime milliseconds
  // Consider using setInterval to achieve this functionality
  // Hint: Make sure only one timer runs at a time
}
