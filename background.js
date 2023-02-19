// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
      id: "0",
      title: "View latex",
      type: 'normal',
      contexts: ['link'],
    });
});

console.log("test");
// Open a new search tab when the user clicks a context menu
chrome.contextMenus.onClicked.addListener((item, tab) => {
  /*
  const tld = item.menuItemId
  let url = new URL(`https://google.${tld}/search`)
  url.searchParams.set('q', item.linkUrl)
  chrome.tabs.create({ url: url.href, index: tab.index + 1 });*/
  /*
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET",item.linkUrl,true);
  xmlhttp.send(); 
  xmlhttp.onload = function() {
    console.log(xmlhttp.responseText);
  }*/
  fetch(item.linkUrl).then(function (response) {
    // The API call was successful!
    return response.text();
  })
  .then((latexContent) => {

    const url = 'https://quicklatex.com/latex3.f';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: "formula=\\" + latexContent
    };
    
    fetch(url, options)
      .then(function (response) {
        // The API call was successful!
        return response.text();
      })
      .then((response) => chrome.tabs.create({ url: response.split(/\r?\n/)[1].split(" ")[0], index: tab.index + 1 }) );
  });
});
