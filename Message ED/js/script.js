const messageText = document.getElementById('message-text');
const processButton = document.getElementById('process-button');
const resultSection = document.getElementById('result-section');
const resultText = document.getElementById('result-text');

const key = 'ZieraxZieraxZierax'; // استبدلها بمفتاحك الخاص

processButton.addEventListener('click', async () => {
  const message = messageText.value;
  const action = document.querySelector('input[name="action"]:checked').value;

  try {
    let result;
    if (action === 'encrypt') {
      result = await encryptMessage(message);
    } else if (action === 'decrypt') {
      result = await decryptMessage(message);
    }

    resultText.textContent = result;
    resultSection.style.display = 'block';
  } catch (error) {
    console.error(error);
    alert('An error occurred: ' + error.message);
  }
});

async function encryptMessage(message) {
  const ciphertext = CryptoJS.AES.encrypt(message, key).toString();
  return ciphertext;
}

async function decryptMessage(message) {
  const bytes = CryptoJS.AES.decrypt(message, key);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);

  // Check if the message is empty or if it contains the string 'not encrypted'
  if (!plaintext || plaintext.includes('not encrypted')) {
    throw new Error('This message is not encrypted');
  }

  return plaintext;
}

