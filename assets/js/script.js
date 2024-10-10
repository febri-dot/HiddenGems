// Update Content On Window Loaded 
window.addEventListener("DOMContentLoaded", async() => {
   const LANGUAGE = localStorage.getItem("language") || "idn";

   const LANGUAGE_DATA = await fetchLanguageData(LANGUAGE);
   updateLanguageContent(LANGUAGE_DATA);
})


// fetch language data from json file 
async function fetchLanguageData(language) {
   const RESPONSE = await fetch(`assets/languages/${language}.json`);
   return RESPONSE.json()
}

// update language in content
function updateLanguageContent(language){
   document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = language[key];
   });
   
}