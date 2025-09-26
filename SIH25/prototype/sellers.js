// Load saved entries from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedEntries = JSON.parse(localStorage.getItem("cropEntries")) || [];
  const journalList = document.getElementById("journalList");

  savedEntries.forEach(entry => {
    const entryDiv = createEntryDiv(entry.cropId, entry.text, entry.image);
    journalList.prepend(entryDiv);
  });
});

function saveEntry() {
  const textArea = document.getElementById("journalEntry");
  const imageInput = document.getElementById("journalImage");
  const cropIdInput = document.getElementById("cropId");
  const journalList = document.getElementById("journalList");

  const cropId = cropIdInput.value.trim();
  const entryText = textArea.value.trim();

  if (cropId === "") {
    alert("Please enter a Crop ID!");
    return;
  }

  if (entryText === "" && (!imageInput.files || imageInput.files.length === 0)) return;

  let imageData = null;
  if (imageInput.files && imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageData = e.target.result;
      saveToLocalStorage(cropId, entryText, imageData);

      const entryDiv = createEntryDiv(cropId, entryText, imageData);
      journalList.prepend(entryDiv);
    };
    reader.readAsDataURL(imageInput.files[0]); // Convert image to base64
  } else {
    saveToLocalStorage(cropId, entryText, imageData);
    const entryDiv = createEntryDiv(cropId, entryText, imageData);
    journalList.prepend(entryDiv);
  }

  // Clear inputs
  textArea.value = "";
  imageInput.value = "";
  cropIdInput.value = "";
}

// Save entry into localStorage
function saveToLocalStorage(cropId, text, image) {
  const savedEntries = JSON.parse(localStorage.getItem("cropEntries")) || [];
  savedEntries.push({ cropId, text, image });
  localStorage.setItem("cropEntries", JSON.stringify(savedEntries));
}

// Delete entry from localStorage
function deleteEntry(cropId, text, image) {
  let savedEntries = JSON.parse(localStorage.getItem("cropEntries")) || [];

  savedEntries = savedEntries.filter(entry => {
    return !(entry.cropId === cropId && entry.text === text && entry.image === image);
  });

  localStorage.setItem("cropEntries", JSON.stringify(savedEntries));
}

// Create entry card
function createEntryDiv(cropId, text, image) {
  const entryDiv = document.createElement("div");
  entryDiv.classList.add("journal-entry");

  const cropHeader = document.createElement("h3");
  cropHeader.textContent = `Crop: ${cropId}`;
  entryDiv.appendChild(cropHeader);

  if (text) {
    const p = document.createElement("p");
    p.textContent = text;
    entryDiv.appendChild(p);
  }

  if (image) {
    const img = document.createElement("img");
    img.src = image;
    entryDiv.appendChild(img);
  }

  // --- Delete Button ---
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginTop = "10px";
  deleteBtn.style.background = "#09321aff"; 
  deleteBtn.style.color = "#ebdfa0ff";
  deleteBtn.style.border = "none";
  deleteBtn.style.padding = "8px 12px";
  deleteBtn.style.borderRadius = "6px";
  deleteBtn.style.cursor = "pointer";

  deleteBtn.addEventListener("click", () => {
    deleteEntry(cropId, text, image);
    entryDiv.remove();
  });

  entryDiv.appendChild(deleteBtn);

  return entryDiv;
}

// Filter entries by crop ID
function filterEntries() {
  const searchValue = document.getElementById("searchCrop").value.toLowerCase();
  const entries = document.querySelectorAll(".journal-entry");

  entries.forEach(entry => {
    const cropHeader = entry.querySelector("h3").textContent.toLowerCase();
    if (cropHeader.includes(searchValue)) {
      entry.style.display = "block";
    } else {
      entry.style.display = "none";
    }
  });
}
