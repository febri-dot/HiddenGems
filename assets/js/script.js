const HOSTNAME = window.location.hostname
const PROTOCOL = window.location.protocol; 
const HOST     = window.location.host; 
const PATHNAME = window.location.pathname.split('/'); 
const BASEFOLDER = PATHNAME[1]; 
const BASE_URL = HOSTNAME == "localhost" ? `${PROTOCOL}//${HOST}/${BASEFOLDER}/` : `${PROTOCOL}//${HOST}`;


// Update Content On Window Loaded 
window.addEventListener("DOMContentLoaded", async() => {
   const LANGUAGE = localStorage.getItem("language") || "idn";

   const LANGUAGE_DATA = await fetchLanguageData(LANGUAGE);
   updateLanguageContent(LANGUAGE_DATA);

   // Active Language
   document.querySelectorAll('[data-language]').forEach(element => {
      let lang = element.getAttribute("data-language");

      if (lang === LANGUAGE) {
         element.classList.add("active");
         let children = element.children;
         let target   = document.querySelector(".active-language");

         // Remove all content in target
         target.innerHTML = "";

         // Change content in active-language by cloning children
         Array.from(children).forEach(child => {
            let clone_child = child.cloneNode(true);
            target.appendChild(clone_child);
         });

         element.parentElement.style.display = "none";
      } else {
         element.classList.remove("active");
         element.parentElement.style.display = "";
      }
   });

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

      if(language[key]) {
         element.innerHTML = language[key]
      }
   });
   
}

// Change Language 
function changeLanguage(language){
   localStorage.setItem('language', language);
   location.reload();
}

// On Scroll Navbar Behaviour
let last_scroll_posisition = window.pageXOffset || document.documentElement.scrollTop;
   
window.onscroll = function (e) {
   let current_scroll_position = window.pageXOffset || document.documentElement.scrollTop;

   if (current_scroll_position > last_scroll_posisition) {
      // Scroll Down
      document.querySelector(".navbar").classList.add("hidden");
      

   }else if (current_scroll_position < last_scroll_posisition) {
      // Scroll Up
      document.querySelector(".navbar").classList.remove("hidden");
   }

   last_scroll_posisition = current_scroll_position;
   
}

// Keeps the URL unchanged when click menu 
function scrollToView(link) {
   let id = link.getAttribute("data-destination_id");
   let destination_element = document.getElementById(id);

   if(destination_element) {
      destination_element.scrollIntoView({ behavior: 'smooth' });
   }else {
      window.location.href = `${BASE_URL}#${id}`;
   }
}

document.addEventListener('DOMContentLoaded', function() {
   if (window.location.hash) {
      let destination_element = document.querySelector(`${window.location.hash}`);
      if (destination_element) {
         window.scrollTo({
            top: destination_element.offsetTop,
            behavior: 'smooth'
         });

         // remove hash without reload page
         history.replaceState(null, null, ' ');
      }
   }
});

// Typing and delete text effect
let typed_text = document.querySelector(".attractive-text-right-typed-text");
let cursor     = document.querySelector(".attractive-text-right-cursor");
let language   = localStorage.getItem("language") || "idn";
let text       

if(language == "idn") {
   text = [
      "Kota Istimewa",
      "Alam Menakjubkan",
      "Kuliner Nikmat",
      "Budaya memukau"
   ]
}else {
   text = [
      "Special City",
      "Amazing Nature",
      "Delicious Cuisine",
      "Fascinating Culture"
   ]
}

let typing_delay = 200;
let erasing_delay = 100;
let new_text_delay = 2000;
let text_index = char_index = 0

document.addEventListener("DOMContentLoaded", function () {
   if(typed_text) {
      if (text.length) setTimeout(typing, new_text_delay + 250);
   }
});

function typing() {
   if (char_index < text[text_index].length) {
      if(!cursor.classList.contains("typing"))
         cursor.classList.add("typing")

      typed_text.textContent += text[text_index].charAt(char_index);

      char_index++;
      setTimeout(typing, typing_delay);
   }else {
      cursor.classList.remove("typing");
      setTimeout(erasing, new_text_delay);
   }
}

function erasing() {
   if (char_index > 0) {
      if (!cursor.classList.contains("typing"))
         cursor.classList.add("typing");
      typed_text.textContent = text[text_index].substring(0,char_index - 1);
      char_index--;
      setTimeout(erasing, erasing_delay);
   } else {
      cursor.classList.remove("typing");
      text_index++;
      if (text_index >= text.length) text_index = 0;
      setTimeout(typing, typing_delay + 1100);
   }
}


// Redirect to Blogs URL 
function goToLinkBlog(filename) {
   window.location.href = `${BASE_URL}/blogs/${filename}`;
}

function scrollBlogs(slider) {
   if (slider.scrollLeft > 0) {
      slider.querySelector(".blogs-split-screen-left").classList.add("hidden");
   }else {
      slider.querySelector(".blogs-split-screen-left").classList.remove("hidden");
   }
}

function infiniteScrollGallery(slider) {
   let gallery_items = slider.querySelectorAll('.gallery-column'); 

   if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
      gallery_items.forEach(item => {
         slider.appendChild(item.cloneNode(true));
      })

   }
}

// Prevent Scroll What Can I do Using Mouse
document.querySelector(".section-what-can-i-do").addEventListener('wheel', 
   function(event) { 
      if (event.shiftKey) { 
         event.preventDefault(); 
      } 
   }, 
   { passive: false }
);

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