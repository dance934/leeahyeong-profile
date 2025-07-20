const fs = require('fs');
const path = require('path');

const albumDir = path.join(__dirname, 'public', 'images', 'album');
const outputFile = path.join(__dirname, 'src', 'albumImages.js');

fs.readdir(albumDir, (err, files) => {
  if (err) {
    console.error('Error reading album directory:', err);
    return;
  }

  const imagePaths = files
    .filter(file => file.endsWith('.webp') || file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif')) // Filter for common image formats
    .sort() // Sort files alphabetically for consistent order
    .map(file => `/images/album/${file}`);

  const content = `const allImages = ${JSON.stringify(imagePaths, null, 2)};
export default allImages;
`;

  fs.writeFile(outputFile, content, (err) => {
    if (err) {
      console.error('Error writing albumImages.js:', err);
      return;
    }
    console.log('Successfully generated src/albumImages.js with album image paths.');
  });
});
