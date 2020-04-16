
userLocation (location) => {displayImage(location)}

navigator.geolocation.getCurrentPosition(userLocation, fallBackLocation, option)

fetch('https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=93bdea8ccea36d596c0021e136e28669&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=39.76574&lon=-86.1579024&text=ducks')
.then(response => response.json())
.then(function (dataObj){
    console.log(dataObj)
    let photosArr = dataObj.photos.photo
    
    photosArr.forEach(function (photoObj){
        let photoTitle = photoObj.title
        let header = document.createElement('h3')
        let image = document.createElement('img')

        image.setAttribute('src',"https://farm" + photoObj.farm + ".staticflickr.com/" + photoObj.server + "/" + photoObj.id + "_" + photoObj.secret + ".jpg")
        header.appendChild(document.createTextNode(photoTitle))
        document.body.appendChild(header)
        document.body.appendChild(image)
    })
})

