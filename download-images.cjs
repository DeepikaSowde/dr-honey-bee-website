const fs = require("fs");
const https = require("https");
const path = require("path");

// --- NEW STABLE URLS (Pexels & Pixabay) ---
// These links are script-friendly and won't give 404s
const images = [
  // --- PANTRY ---
  {
    url: "https://images.pexels.com/photos/33266/honey-sweet-syrup-food.jpg?auto=compress&cs=tinysrgb&w=800",
    folder: "pantry",
    name: "murunga-honey.jpg",
  },
  {
    url: "https://images.pexels.com/photos/1089932/pexels-photo-1089932.jpeg?auto=compress&cs=tinysrgb&w=800",
    folder: "pantry",
    name: "sunflower-honey.jpg",
  },
  {
    url: "https://images.pexels.com/photos/3756042/pexels-photo-3756042.jpeg?auto=compress&cs=tinysrgb&w=800",
    folder: "pantry",
    name: "multiflower-honey.jpg",
  },
  {
    url: "https://images.pexels.com/photos/1849767/pexels-photo-1849767.jpeg?auto=compress&cs=tinysrgb&w=800",
    folder: "pantry",
    name: "leaf-honey.jpg",
  },
  {
    url: "https://images.pexels.com/photos/33260/honey-comb-sweet-food.jpg?auto=compress&cs=tinysrgb&w=800",
    folder: "pantry",
    name: "beeswax.jpg",
  },
  {
    url: "https://images.pexels.com/photos/4198426/pexels-photo-4198426.jpeg?auto=compress&cs=tinysrgb&w=800",
    folder: "pantry",
    name: "bee-pollen.jpg",
  },

  // --- APIARY (EQUIPMENT) ---
  // Industrial machine for extractor
  {
    url: "https://images.pexels.com/photos/3735190/pexels-photo-3735190.jpeg?auto=compress&cs=tinysrgb&w=800",
    folder: "apiary",
    name: "extractor.jpg",
  },
  // Beekeeping Smoker
  {
    url: "https://images.pexels.com/photos/7862494/pexels-photo-7862494.jpeg?auto=compress&cs=tinysrgb&w=800",
    folder: "apiary",
    name: "smoker.jpg",
  },
  // Knife/Tool
  {
    url: "https://cdn.pixabay.com/photo/2017/09/22/09/25/beekeeper-2774944_1280.jpg",
    folder: "apiary",
    name: "knife.jpg",
  },
  // Veil/Hat
  {
    url: "https://images.pexels.com/photos/4503269/pexels-photo-4503269.jpeg?auto=compress&cs=tinysrgb&w=800",
    folder: "apiary",
    name: "veil.jpg",
  },
  // Gloves
  {
    url: "https://images.pexels.com/photos/4503265/pexels-photo-4503265.jpeg?auto=compress&cs=tinysrgb&w=800",
    folder: "apiary",
    name: "gloves.jpg",
  },
  // Full Suit
  {
    url: "https://images.pexels.com/photos/8106294/pexels-photo-8106294.jpeg?auto=compress&cs=tinysrgb&w=800",
    folder: "apiary",
    name: "full-suit.jpg",
  },
  // Jacket
  {
    url: "https://images.pexels.com/photos/8106294/pexels-photo-8106294.jpeg?auto=compress&cs=tinysrgb&w=800",
    folder: "apiary",
    name: "half-jacket.jpg",
  },
  // Hives (Boxes)
  {
    url: "https://images.pexels.com/photos/2670783/pexels-photo-2670783.jpeg?auto=compress&cs=tinysrgb&w=800",
    folder: "apiary",
    name: "indian-hive.jpg",
  },
  {
    url: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800",
    folder: "apiary",
    name: "italian-hive.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2012/10/26/02/47/beehive-63116_1280.jpg",
    folder: "apiary",
    name: "stingless-box.jpg",
  },

  // --- COLONY (BEES) ---
  {
    url: "https://images.pexels.com/photos/56897/bee-hymenoptera-insect-flower-56897.jpeg?auto=compress&cs=tinysrgb&w=800",
    folder: "colony",
    name: "italian-bee.jpg",
  },
  {
    url: "https://images.pexels.com/photos/551622/pexels-photo-551622.jpeg?auto=compress&cs=tinysrgb&w=800",
    folder: "colony",
    name: "indian-bee.jpg",
  },
  {
    url: "https://images.pexels.com/photos/326058/pexels-photo-326058.jpeg?auto=compress&cs=tinysrgb&w=800",
    folder: "colony",
    name: "stingless-bee.jpg",
  },
];

const downloadImage = (url, folder, filename) => {
  const dir = path.join(__dirname, "public", "images", folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, filename);
  const file = fs.createWriteStream(filePath);

  const options = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  };

  https
    .get(url, options, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`✅ Downloaded: ${folder}/${filename}`);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        downloadImage(response.headers.location, folder, filename);
      } else {
        console.error(
          `❌ Failed: ${filename} (Status: ${response.statusCode})`
        );
        file.close();
        fs.unlink(filePath, () => {});
      }
    })
    .on("error", (err) => {
      fs.unlink(filePath, () => {});
      console.error(`❌ Error: ${err.message}`);
    });
};

console.log("🚀 Starting Download (Attempt 3 - Final)...");
images.forEach((img) => downloadImage(img.url, img.folder, img.name));
