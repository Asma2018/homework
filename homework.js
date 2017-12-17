function getAjaxData(url){
  return new Promise((resolve, reject)=>{
    let req = new XMLHttpRequest();

    req.onload = () => resolve(JSON.parse(req.responseText))
    req.onerror = () => rejeect(req.status.responseText)

    req.open('GET', url)
    req.send()
  })
}

let dataGeting = getAjaxData('https://jsonplaceholder.typicode.com/users')

dataGeting
.then(main)
.catch(main1)

function main(data){
    let mapingData = data.map(user => {
      console.log(user)

      let todosURL = `https://jsonplaceholder.typicode.com/users/${user.id}/todos`;
      getAjaxData(todosURL)
      .then(function(data){
        return user.trodos = data
      })
        .catch(main1)
    })
}
function main1(err){
  console.log('Error loading users: ', err)
}

Promise.all([req,dataGeting,mapingData,todosURL]) // Array of promises to complete
.then(function(results) {
  console.log('all data has loaded');
})
.catch(function(error) {
  console.log('one or more requests have failed: ' + error);
});