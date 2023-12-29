//**************************Chrome Extension**************************
//Website Storer


let myLeads = []
// myLeads = JSON.stringify(myLeads)
//const(constant) can not be reassigned
const inputEl = document.getElementById("input-el")
const inputbtn = document.getElementById("input-btn")
//Unordered list
const ulEl = document.querySelector("#ul-el")
const deletebtn = document.getElementById("delete-btn")
const tabbtn = document.getElementById("tab-btn")

//Local Storage to store links
//Local Store only use Strings
// localStorage.setItem(
//     "Myleads", "www.fb.com"
// )
// console.log(localStorage.getItem("Myleads"))
// localStorage.clear()
// console.log(localStorage.getItem("Myleads"))
const leadsfromlocal = JSON.parse(localStorage.getItem("myLeads"))
if(leadsfromlocal) {
    myLeads = leadsfromlocal
    renderleads(myLeads)
}

tabbtn.addEventListener("click", function() {
    //Save the url instead of logging out
    //console.log(tabs[0].url)
    //tabs = current tab in Chrome
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderleads(myLeads)
    })

})

//Event Listners
inputbtn.addEventListener("click", function() {
    console.log("Add")
    //.value is used for get value from inputEL
    myLeads.push(inputEl.value)
    console.log(myLeads)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderleads(myLeads)
})

function renderleads(leads) {
    let listitems = ""
    for(let i = 0; i<leads.length; i++) {
        //innerHTML
        //easier method
        //listitems = "<li><a target='blank' href='#'>" +  myLeads[i] + "</a></li>"
        //using template strings
        listitems = `<li>
                        <a target='blank' href=${leads[i]}>
                            ${leads[i]}
                        </a>
                    </li>`
        //hard method
        // const li = document.createElement('li')        
        // li.textContent = myLeads[i]
        // ulEl.append(li)
    }
    ulEl.innerHTML = listitems
}
//DeleteButton
deletebtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    renderleads(myLeads)
})



























//********************************************************************