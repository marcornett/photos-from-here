let userInput = 'ducks'

userLocation = (location) => { grabDataPromise(location.coords) }
const fallBackLocation = { latitude: 32.715736, longitude: -117.161087 }
useFallBackLocation = (err) => { grabDataPromise(fallBackLocation) }
const options = { maximumAge: 0, enableHighAccuracy: true }

navigator.geolocation.getCurrentPosition(userLocation, useFallBackLocation, options)


function userSearchByText() {
    let submitButton = document.querySelector('#submit')
    submitButton.addEventListener('click', function (event) {
        userInput = document.querySelector('#user-input').value
        // hard coded fallback location, need to find alternative
        grabDataPromise(fallBackLocation, userInput)
    })
}
userSearchByText()

function constructImageURL(photoObj) {
    const { farm, server, id, secret } = photoObj
    return "https://farm" + farm +
        ".staticflickr.com/" + server +
        "/" + id + "_" + secret + ".jpg";
}

function grabDataPromise(location, userInputSearch = userInput) {
    let responsePromise = fetch(`https://shrouded-mountain-15003.herokuapp.com/` +
        `https://flickr.com/services/rest/` +
        `?api_key=93bdea8ccea36d596c0021e136e28669&` +
        `format=json&` +
        `nojsoncallback=1&` +
        `method=flickr.photos.search&` +
        `safe_search=1&` +
        `per_page=5&` +
        `lat=${location.latitude}&` +
        `lon=${location.longitude}&` +
        `text=${userInputSearch}`)

    let dataPromise = responsePromise.then(response => response.json())
    dataPromise.then(function (dataObj) {
        let photosArr = dataObj.photos.photo
        addPhotoObjToArr(photosArr)
        displayImage(photosArr[0])
    })
}

let photosArr = []
function addPhotoObjToArr(arr) {
    arr.forEach(function(photoObj){
        photosArr.push(photoObj)
    })
}


function displayImage(photosObj) {
    let photoUrl = 'Link to image'
    let link = document.createElement('a')
    let image = document.createElement('img')
        console.log(photosObj)
        const url = constructImageURL(photosObj)
        image.setAttribute('src', url)
        // Find a link to the flickr image page instead of just the image
        link.setAttribute('href', url)
        link.appendChild(document.createTextNode(photoUrl))
        document.body.appendChild(link)
        document.body.appendChild(image)
}

function nextImageSelection(arr) {
    let counter = 1
    let nextPhotoButton = document.querySelector('#next')
    nextPhotoButton.addEventListener('click', function (event) {
        if(counter < 5){
            displayImage(arr[counter])
            console.log(counter)
            counter++
        } else{
            displayImage(arr[counter])
            counter = 0
        }
    })
}
nextImageSelection(photosArr)