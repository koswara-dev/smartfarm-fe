import CryptoJS from 'crypto-js'

// Key harus 32 byte untuk AES-256
const SECRET_KEY = CryptoJS.enc.Utf8.parse('Indonesia@2025Indonesia@20251212')
// 32 chars = 256 bit

export const encryptAES = (text: string): string => {
  const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7 // sama dengan PKCS5Padding
  })

  return encrypted.toString() // Base64 ciphertext
}

export const decryptAES = (ciphertext: string): string => {
  try {
    const decrypted = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })

    return decrypted.toString(CryptoJS.enc.Utf8)
  } catch (err) {
    console.error('AES decrypt error:', err)
    return ''
  }
}

// const decrypted = decryptAES('VUjpTqYzNzRq1axLNmkfbA==')
// console.log('Decrypted:', decrypted)
