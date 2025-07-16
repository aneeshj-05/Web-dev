function encryptText() {
  const inputText = document.getElementById("inputText").value;
  const passkey = document.getElementById("passkeyEncrypt").value;

  if (!inputText || !passkey) {
    alert("Please enter both text and passkey.");
    return;
  }

  // AES encrypt the text
  const encrypted = CryptoJS.AES.encrypt(inputText, passkey).toString();

  // Compress and URL-encode the encrypted string
  const compressed = LZString.compressToEncodedURIComponent(encrypted);

  document.getElementById("encryptedOutput").value = compressed;
}

function decryptText() {
  const encryptedInput = document.getElementById("encryptedInput").value;
  const passkey = document.getElementById("passkeyDecrypt").value;

  if (!encryptedInput || !passkey) {
    alert("Please enter both encrypted text and passkey.");
    return;
  }

  try {
    // Decompress using URL-safe decoding
    const decompressed = LZString.decompressFromEncodedURIComponent(encryptedInput);

    // Decrypt using AES
    const decrypted = CryptoJS.AES.decrypt(decompressed, passkey).toString(CryptoJS.enc.Utf8);

    if (!decrypted) throw new Error("Incorrect passkey or data");

    document.getElementById("decryptedOutput").value = decrypted;
  } catch (e) {
    alert("Failed to decrypt. Wrong passkey or corrupted data.");
    document.getElementById("decryptedOutput").value = "";
  }
}

function copyEncrypted() {
  const output = document.getElementById("encryptedOutput").value;
  if (!output) {
    alert("No encrypted text to copy.");
    return;
  }

  navigator.clipboard.writeText(output).then(
    () => alert("Encrypted text copied to clipboard!"),
    () => alert("Failed to copy to clipboard.")
  );
}
