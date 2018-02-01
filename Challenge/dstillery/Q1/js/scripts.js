document.addEventListener("DOMContentLoaded", () => {

  // Grab all the image containers
  const imageContainer = document.getElementsByClassName("image-container");

  // On load we check once also
  window.addEventListener("load", checkScroll);

  // When scrolling the document
  document.addEventListener("scroll", checkScroll);

  for (let i = 0; i < imageContainer.length; i++) {

    const image = document.createElement("IMG");
    image.setAttribute("src", "images/px.jpg");
    image.setAttribute("data-src", "http://www.f-covers.com/cover/dalmatian-puppy-facebook-cover-timeline-banner-for-fb.jpg");
    imageContainer[i].appendChild(image);
  }
});

// Throttling could be used here to reduce the scroll checks
const checkScroll = (e) => {
  const imageContainer = document.getElementsByClassName("image-container");

  // Grabs the scroll position based depending on browser
  const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  
  // Get the screen view height
  const viewHeight = document.documentElement.clientHeight;
  for (let i = 0; i < imageContainer.length; i++) {

    // This will get the image top position then subtract the client view height
    // The result will be the number of pixels until image is in view
    const imgScrollPos = imageContainer[i].getBoundingClientRect().top - viewHeight;

    // This will be the area when you grab the  actual image
    const bufferZone = 50;
    
    // Swap in the actual image when the view is close to the image
    // and then remove the data-src so that extra calls aren't made
    const image = imageContainer[i].children[0];
    if (image.getAttribute("data-src") && imgScrollPos <= bufferZone) {
      const adImage = image.getAttribute("data-src");
      image.removeAttribute("data-src");
      image.setAttribute("src", adImage);
    }
  }
};