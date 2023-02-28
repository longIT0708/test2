// Get the upload form and the images container
const uploadForm = document.getElementById('upload-form');
const imagesContainer = document.querySelector('.images');

// Add an event listener for the submit button on the upload form
uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the name and image file from the form
  const name = event.target.elements.name.value;
  const imageFile = event.target.elements.image.files[0];

  // Create a new FormData object and append the name and image file to it
  const formData = new FormData();
  formData.append('name', name);
  formData.append('image', imageFile);

  try {
    // Send a POST request to the server with the FormData
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    // Get the response as JSON
    const data = await response.json();

    // Add the uploaded image to the images container
    const image = createImageElement(data);
    imagesContainer.appendChild(image);

    // Reset the form
    event.target.reset();
  } catch (error) {
    console.error(error);
  }
});

// Add an event listener for clicks on the delete buttons
imagesContainer.addEventListener('click', async (event) => {
  if (event.target.matches('.delete-button')) {
    const imageId = event.target.dataset.id;
    try {
      // Send a DELETE request to the server with the image ID
      const response = await fetch(`/image/${imageId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Remove the image from the images container
        event.target.parentElement.parentElement.remove();
      }
    } catch (error) {
      console.error(error);
    }
  }
});

// Create an <img> element with the given image data
function createImageElement(imageData) {
  const image = document.createElement('div');
  image.classList.add('image');
  image.innerHTML = `
    <img src="/images/${imageData.filename}" alt="${imageData.originalname}">
    <div class="overlay">
      <button class="delete-button" data-id="${imageData._id}">Delete</button>
    </div>
  `;
  return image;
}
