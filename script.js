const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
const count = 30;
const apiKey = 'SHfJeeHRj4SdbpP9rk5BZ5IeevQXVUfvVB_lcSUnifM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
function imageLoaded() {
	imagesLoaded++;
	if(imagesLoaded === totalImages){
		ready = true;
		loader.hidden = true;
	}
}

// Helper function to Set Attribute on Dom Elements
function setAttributes(element, attributes){
	for (const key in attributes){
		element.setAttribute(key, attributes[key]);
	}
}

// Create Elements for Links and Photos, Add to DOM
function displayPhotos(){
	imagesLoaded = 0;
	totalImages = photosArray.length;
	// Run function for each object in photosArray
	photosArray.forEach((photo) => {
		// Create <a>  to link to Unsplash
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank'
		});
		// Create <img> for photo
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		});
		// Event Listener , check when each  is finished loading
		img.addEventListener('load', imageLoaded);
		// Put <img> inside the anchor Elements then put both inside of our img-container
		item.appendChild(img);
		imageContainer.appendChild(item); 
	});
}
// Get photos from Unsplash API
async function getPhotos(){
	try{
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch(error){
		// catch error here
	}
}

// Check to see if scrolling  near the bottom of the page, LOAD MORE PHOTOS
window.addEventListener('scroll', () => {
	if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
		ready = false;
		getPhotos();
	}
 });

// On Load
getPhotos(); 