// const BASE_URL = window.location.href


// // Update Content On Window Loaded 
// window.addEventListener("DOMContentLoaded", async() => {
//    const LANGUAGE = localStorage.getItem("language") || "idn";

//    const LANGUAGE_DATA = await fetchLanguageData(LANGUAGE);
//    updateLanguageContent(LANGUAGE_DATA);

//    // Active Language
//    document.querySelectorAll('[data-language]').forEach(element => {
//       lang = element.getAttribute("data-language");
      
//       if(lang == LANGUAGE){
//          element.classList.add("active")
//       }
//    })
   
// })


// // fetch language data from json file 
// async function fetchLanguageData(language) {
//    const RESPONSE = await fetch(`${BASE_URL}/assets/languages/${language}.json`);
//    return RESPONSE.json()
// }

// // update language in content
// function updateLanguageContent(language){
//    document.querySelectorAll('[data-i18n]').forEach(element => {
//       const key = element.getAttribute('data-i18n');
//       element.textContent = language[key];
//    });
   
// }

// // Change Language 
// function changeLanguage(language){
//    localStorage.setItem('language', language);
//    location.reload();
// }

// Blogs Scroll What Can I do
function scrollWhatCanIdo(button, direction=false){
   let parent        = button.closest(".section-what-can-i-do")
   let wrapper       = parent.querySelector(".what-can-i-do-wrapper")
   let styles        = window.getComputedStyle(wrapper); 
   let gap           = parseFloat(styles.getPropertyValue('gap'));
   let scroll_active = wrapper.querySelector(".what-can-i-do.active");
   let index_active  = parseInt(scroll_active.getAttribute("data-index"));
   let scroll_amount = scroll_active.offsetWidth + gap;
   let dot_active    = document.querySelector(".dot-navigation.active");


   let index_current = index_difference = dot_current = scroll_current = "";

   if(!direction) {
      index_current    = parseInt(button.getAttribute("data-index"));
      index_difference = index_current - index_active;
      scroll_amount    = Math.abs(index_difference) * scroll_amount;
      direction        = index_difference < 0 ? "left" : "right";
      dot_current      = button;
      

   }else {
      index_current = direction == "left" ? index_active - 1 : index_active + 1;
      dot_current   = document.querySelector(`.dot-navigation[data-index="${index_current}"]`);
   }

   scroll_current    = document.querySelector(`.what-can-i-do[data-index="${index_current}"]`);
   let scroll_length = wrapper.querySelectorAll(".what-can-i-do").length;   
   

   if((direction == "left" && index_current >= 1) || (direction == "right" && index_current <= scroll_length)){
      if(direction == "left") {
         wrapper.scrollLeft -= scroll_amount
      }else {
         wrapper.scrollLeft += scroll_amount
      }
   
      scroll_active.classList.remove("active");
      scroll_current.classList.add("active");
   
      dot_active.classList.remove('active');
      dot_current.classList.add('active');
      
   }
   

}