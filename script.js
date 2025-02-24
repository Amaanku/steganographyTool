// Set theme based on system preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
document.documentElement.setAttribute('data-theme', prefersDarkScheme.matches ? 'dark' : 'light');

// Watch for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
});


        let originalImage = null;

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        let currentMode = 'encode';
        
        // Initialize canvas as hidden
        canvas.classList.remove('visible');


        // Handle image upload
        document.getElementById('imageInput').addEventListener('change', function(e) {
            const file = e.target.files[0];
            const img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
                canvas.classList.add('visible');
            };
            
            img.onerror = function() {
                canvas.classList.remove('visible');
                alert('Failed to load image. Please try again.');
            };



            img.src = URL.createObjectURL(file);
        });

        // Switch between modes
        function switchMode(mode) {
            currentMode = mode;
            const encodeBtn = document.getElementById('encodeModeBtn');
            const decodeBtn = document.getElementById('decodeModeBtn');
            const encodeSection = document.getElementById('encodeSection');
            const decodeSection = document.getElementById('decodeSection');

            if (mode === 'encode') {
                encodeBtn.classList.add('active-mode');
                decodeBtn.classList.remove('active-mode');
                encodeSection.style.display = 'block';
                decodeSection.style.display = 'none';
            } else {
                encodeBtn.classList.remove('active-mode');
                decodeBtn.classList.add('active-mode');
                encodeSection.style.display = 'none';
                decodeSection.style.display = 'block';
            }
        }

        // Simple XOR encryption with passcode
        function encryptDecrypt(text, passcode) {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const charCode = text.charCodeAt(i) ^ passcode.charCodeAt(i % passcode.length);
                result += String.fromCharCode(charCode);
            }
            return result;
        }

        // Hide message in image
        function hideMessage() {
            if (!originalImage) {
                alert('Please upload an image first!');
                return;
            }

            const message = document.getElementById('message').value;
            const passcode = document.getElementById('encodePasscode').value;
            
            if (!message || !passcode) {
                alert('Please enter both message and passcode!');
                return;
            }

            const encryptedMessage = encryptDecrypt(message, passcode);
            const binaryMessage = encryptedMessage.split('')
                .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
                .join('') + '00000000'; // Add null terminator

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            let messageIndex = 0;
            for (let i = 0; i < data.length && messageIndex < binaryMessage.length; i += 4) {
                if (messageIndex < binaryMessage.length) {
                    data[i] = (data[i] & 0xFE) | parseInt(binaryMessage[messageIndex]);
                    messageIndex++;
                }
            }

            ctx.putImageData(imageData, 0, 0);
            
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = canvas.toDataURL('image/png');
            downloadLink.download = 'secret_image.png';
            downloadLink.style.display = 'block';
            downloadLink.textContent = 'Download Modified Image';
            
            alert('Message encoded successfully! Download the modified image.');
        }

        // Extract message from image
        function extractMessage() {
            if (!originalImage) {
                alert('Please upload an image first!');
                return;
            }

            const passcode = document.getElementById('decodePasscode').value;
            if (!passcode) {
                alert('Please enter the passcode!');
                return;
            }

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            let binaryMessage = '';
            for (let i = 0; i < data.length; i += 4) {
                binaryMessage += (data[i] & 1).toString();
            }

            let encryptedMessage = '';
            for (let i = 0; i < binaryMessage.length; i += 8) {
                const byte = binaryMessage.substr(i, 8);
                if (byte === '00000000') break;
                encryptedMessage += String.fromCharCode(parseInt(byte, 2));
            }

            const decryptedMessage = encryptDecrypt(encryptedMessage, passcode);
            document.getElementById('extractedMessage').textContent = decryptedMessage;
        }

        // Initialize with encode mode
        switchMode('encode');
