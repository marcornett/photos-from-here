let userInput = 'ducks'
let userLocation = {}
function userLocationInput(location) {
    userLocation = location.coords
    grabDataPromise(userLocation)
}
const fallBackLocation = { latitude: 39.768402, longitude: -86.158066 }
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
    if (photoObj) {
        const { farm, server, id, secret } = photoObj
        return "https://farm" + farm +
            ".staticflickr.com/" + server +
            "/" + id + "_" + secret + ".jpg";
    }
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
        let photosObj = dataObj.photos.photo
        removePhotosFromArr()
        addPhotoObjToArr(photosObj)
        displayImage(photosObj[0])
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
let link = document.querySelector('a')
let imageContainer = document.querySelector('#image-container')
let titleOfImage = document.querySelector('#image-title')
titleOfImage.textContent = 'No Title'


function displayImage(photosObj) {
    const imageContainerURL = "url(" + constructImageURL(photosObj) + ")"
    let urlLink = constructImageURL(photosObj)
    imageContainer.style.backgroundImage = imageContainerURL
    titleOfImage.textContent = photosObj?.title
    link.textContent = "Image Link"
    link.setAttribute('href', urlLink)
}

let counter = 1
function nextImageSelection(arr) {
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

function previousImageSelection(arr) {
    let previousPhotoButton = document.querySelector('#previous')
    previousPhotoButton.addEventListener('click', function (event) {
        if (counter > 0) {
            displayImage(arr[counter])
            counter--
        } else {
            displayImage(arr[counter])
            counter = 4
        }
    })
}
previousImageSelection(photosArr)
