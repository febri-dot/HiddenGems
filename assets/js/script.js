const BASE_URL = window.location.href


// Update Content On Window Loaded 
window.addEventListener("DOMContentLoaded", async() => {
   const LANGUAGE = localStorage.getItem("language") || "idn";

   const LANGUAGE_DATA = await fetchLanguageData(LANGUAGE);
   updateLanguageContent(LANGUAGE_DATA);

   // Active Language
   document.querySelectorAll('[data-language]').forEach(element => {
      lang = element.getAttribute("data-language");
      
      if(lang == LANGUAGE){
         element.classList.add("active")
      }
   })
   
})


// fetch language data from json file 
async function fetchLanguageData(language) {
   const RESPONSE = await fetch(`${BASE_URL}/assets/languages/${language}.json`);
   return RESPONSE.json()
}

// update language in content
function updateLanguageContent(language){
   document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = language[key];
   });
   
}

// Change Language 
function changeLanguage(language){
   localStorage.setItem('language', language);
   location.reload();
}