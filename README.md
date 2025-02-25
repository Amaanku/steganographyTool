# StegoVault

StegoVault is a simple and efficient web-based tool that allows users to hide secret messages inside images using steganography. This project is built using HTML, CSS, and JavaScript, ensuring a lightweight and easy-to-use experience without the need for heavy frameworks. Additionally, a Python script is included for users who prefer to perform steganography in their personal IDE.

## Website

You can visit the website here: [StegoVault](https://amaanku.github.io/steganographyTool/)

## Features
- **Encode Text in Images**: Hide your secret messages inside images securely.
- **Decode Hidden Messages**: Extract hidden messages from encoded images.
- **Lightweight & Fast**: No heavy frameworks, just pure HTML, CSS, and JavaScript.
- **User-Friendly Interface**: Simple and intuitive design for easy use.
- **Secure & Private**: Messages are hidden inside images without altering their visible appearance.
- **Python Support**: A Python script is available for offline usage in personal IDEs.

## How It Works
### Web Version
1. **Upload an Image**: Choose an image where you want to hide your secret message.
2. **Enter a Secret Message**: Type the message you want to hide.
3. **Encode the Message**: The tool will embed the message inside the image using steganography.
4. **Download the Encoded Image**: Save the image with the hidden message.
5. **Decode the Message**: Upload an encoded image to reveal the hidden message.

### Python Version
1. Install the required dependencies:
   ```bash
   pip install cv2
   ```
2. Run the Python script:
   ```bash
   python stegovault.py
   ```
3. Follow the on-screen instructions to encode or decode messages in images.

## Installation & Usage
### Online Usage
Simply open the `index.html` file in a web browser and start encoding and decoding messages.

### Local Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/Amaanku/steganographyTool.git
   ```
2. Open `index.html` in your web browser.

### Python Script Usage
1. Navigate to the project folder:
   ```bash
   cd stegovault
   ```
2. Run the Python script:
   ```bash
   python stegovault.py
   ```

## Technologies Used
- **HTML** – Structure of the webpage
- **CSS** – Styling and layout
- **JavaScript** – Logic for encoding and decoding messages
- **Python** – Alternative implementation for personal IDE users

## Contribution
Feel free to contribute by submitting pull requests, reporting issues, or suggesting new features!

## License
This project is licensed under the MIT License.

## Acknowledgments
- Inspired by the concept of steganography.
- Thanks to the open-source community for resources and guidance.

---
Made with ❤️ by Aman Kushwaha
