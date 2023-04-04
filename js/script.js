const formText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    // console.log(`${country_code}:${countries[country_code]}`);

    let selected;
    //selecting English by defult as FROM language and bangli as TO language
    if (id == 0 && country_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code == "bn-IN") {
      selected = "selected";
    }

    let opction = ` <option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", opction); //adding opction tag inside select tag
  }
});

translateBtn.addEventListener("click", () => {
  let text = formText.value;
  let translateFrom = selectTag[0].value; //getting fromSelect tag value
  let translateTo = selectTag[1].value; //getting toSelect tag value

  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

  //fetching api respopnse and returing it with parsing into js obj
  //and in another then method receving that obj

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      toText.value = data.responseData.translatedText;
    });
});
