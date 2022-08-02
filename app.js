let key = prompt("key eingeben");
let text = prompt("Zeichenkette eingeben");

// Rsbox array 0-256
let RC4_sbox = new Array(256);

function RC4_crypt(key, text) {
  //initialisierung der sbox//////////////
  let temp = 0; //Zwischenspeicher
  let rtext = "";
  for (j = 0; j < 256; j++) RC4_sbox[j] = j;

  for (i = 0; i < 256; i++) {
    j = (j + RC4_sbox[i] + key.charCodeAt(i % key.length)) % 256; //charCodeAt returnt eine Zahl
    temp = RC4_sbox[i]; // i wird zwischengesspeichert
    RC4_sbox[i] = RC4_sbox[j]; //j wird mit i vertauscht
    RC4_sbox[j] = temp; //temp (i) wird mit j vertauscht
  }
  ///////////////////////////////////////
  //Für jeden Buchstaben wird ein Zufallsybyte aus der S-Box ermittelt, Felder des Arr werden jedes mal vertauscht
  for (k = 0; k < text.length; k++) {
    i = (i + 1) % 256;
    j = (j + RC4_sbox[i]) % 256;
    temp = RC4_sbox[i];
    RC4_sbox[i] = RC4_sbox[j];

    RC4_sbox[j] = temp;
    t = (RC4_sbox[i] + RC4_sbox[j]) % 256;
    //Das ermittelte Zufallsbyte und das Textzeichen  wird durch xor miteinander verknüpft
    rtext = rtext + String.fromCharCode(text.charCodeAt(k) ^ RC4_sbox[t]); // fromCharCode gibt einen String zurück
  }
  return rtext;
}

alert(RC4_crypt(key, text));
