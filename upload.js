$(document).ready(() => {
    const uploadForm = $('#upload-form');
  
    // Submit upload form
    uploadForm.on('submit', (event) => {
      event.preventDefault();
  
      const formData = new FormData(uploadForm[0]);
      const folderName = formData.get('folder-name');
      const file = formData.get('file');
      const filename = file.name;
  
      // Create folder if it doesn't exist
      $.ajax({
        url: `/images/${folderName}`,
        method: 'POST',
        success: () => {
          // Upload file to server
          $.ajax({
            url: `/images/${folderName}/${filename}`,
            method: 'PUT',
            data: file,
            processData: false,
            contentType: false,
            success: () => {
              // Redirect to index page
              window.location.href = '/';
            },
          });
        },
      });
    });
  });
  