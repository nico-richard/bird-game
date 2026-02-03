import fs from "fs";

// Lire le fichier en "binary" pour ne pas se faire piéger par le BOM
const raw = fs.readFileSync("dump.json");

// Convertir le buffer UTF-16LE en string UTF-8
// Vérifie le BOM : si 0xFF 0xFE, c'est UTF-16LE
let text: string;
if (raw[0] === 0xff && raw[1] === 0xfe) {
  // UTF-16LE BOM détecté
  text = raw.toString("utf16le");
} else {
  // Pas de BOM, essayer UTF-8
  text = raw.toString("utf8");
}

// Supprimer les caractères corrompus éventuels
const cleaned = text.replace(/\uFFFD/g, ""); // caractère �

// Parser le JSON
const data = JSON.parse(cleaned);

// Vérifier
console.log(`Nombre d'entrées : ${data.length}`);
console.log("Exemples de noms d'oiseaux :");
data.slice(0, 10).forEach((item: any) => console.log(item.name));

// Optionnel : sauvegarder le dump corrigé
fs.writeFileSync("dump-fixed.json", JSON.stringify(data, null, 2), "utf8");
