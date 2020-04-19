let userInput = 'ducks'
let userLocation = {}
function userLocationInput(location) {
    userLocation = location.coords
    grabDataPromise(userLocation)
}
const fallBackLocation = { latitude: 32.715736, longitude: -117.161087 }
function useFallBackLocationInput(err) {
    userLocation = fallBackLocation
    grabDataPromise(userLocation)
}
const options = { maximumAge: 0, enableHighAccuracy: true }

navigator.geolocation.getCurrentPosition(userLocationInput, useFallBackLocationInput, options)


function userSearchByText() {
    let submitButton = document.querySelector('#submit')
    submitButton.addEventListener('click', function (event) {
        userInput = document.querySelector('#user-input').value
        // hard coded fallback location, need to find alternative
        grabDataPromise(fallBackLocation, userInput)
    })
}

function constructImageURL(photoObj) {
    const { farm, server, id, secret } = photoObj
    return "https://farm" + farm +
        ".staticflickr.com/" + server +
        "/" + id + "_" + secret + ".jpg";
}

function grabDataPromise(location, userInputSearch = userInput) {
    userSearchByText()
    let responsePromise = fetch(`https://shrouded-mountain-15003.herokuapp.com/` +
        `https://flickr.com/services/rest/` +
        `?api_key=93bdea8ccea36d596c0021e136e28669&` +
        `format=json&` +
        `nojsoncallback=1&` +
        `method=flickr.photos.search&` +
        `safe_search=1&` +
        `per_page=5&` +
        `lat=${userLocation.latitude}&` +
        `lon=${userLocation.longitude}&` +
        `text=${userInputSearch}`)

    let dataPromise = responsePromise.then(response => response.json())
    dataPromise.then(function (dataObj) {
        let photosArr = dataObj.photos.photo
        removePhotosFromArr()
        addPhotoObjToArr(photosArr)
        displayImage(photosArr[0])
    })
}

let photosArr = []
function addPhotoObjToArr(arr) {
    arr.forEach(function (photoObj) {
        photosArr.push(photoObj)
    })
}

function removePhotosFromArr() {
    photosArr.splice(0, photosArr.length)
}

let photoUrl = 'Link to image'
let link = document.createElement('a')
let imageContainer = document.querySelector('#image-container')

function displayImage(photosObj) {
    const imageContainerURL = "url(" + constructImageURL(photosObj) + ")"
    imageContainer.style.backgroundImage = imageContainerURL
    // Find a link to the flickr image page instead of just the image
    // link.href = url
    // link.appendChild(document.createTextNode(photoUrl))
}

function nextImageSelection(arr) {
    let counter = 1
    let nextPhotoButton = document.querySelector('#next')
    nextPhotoButton.addEventListener('click', function (event) {
        if (counter < 4) {
            displayImage(arr[counter])
            counter++
        } else {
            displayImage(arr[counter])
            counter = 0
        }
    })
}
nextImageSelection(photosArr)
