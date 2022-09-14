document.addEventListener(
    "DOMContentLoaded",
    () => {
        console.log("map JS imported successfully!");

        function createMarker(center, map, title) {
            new google.maps.Marker({
                position: center,
                map: map,
                title: title
            });
        }

        function geocode(map) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        map.setCenter(pos);
                        createMarker(pos, map, "You are here");
                    },
                    function () {
                        console.log("Error in the geolocation service.");
                        // handleLocationError(true, map.getCenter());
                    }
                );
            }
            else {
                console.log("Browser does not support geolocation.");
                // handleLocationError(false, map.getCenter());
            }
        }

        function placeHotel(hotel, map) {
            const hotelLocation = {
                lat: hotel.location.coordinates[1],
                lng: hotel.location.coordinates[0]
            };
            createMarker(hotelLocation, map, hotel.name);
        }

        function placeHotels(hotels, map) {
            hotels.forEach((hotel) => {
                placeHotel(hotel, hotel.location);
            });
        }

        function initMap() {
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 12,
                center: { lat: 40.416775, lng: -3.703790 },
            });
            geocode(map);
        }
        // initMap;

    }
); b