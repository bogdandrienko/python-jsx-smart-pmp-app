from gmplot import gmplot

# Initialize the map at a given point
gmap = gmplot.GoogleMapPlotter(52.13047374297343, 61.33322598988672, 13)

# Add a marker
gmap.marker(52.13047374297343, 61.33322598988672, 'cornflowerblue')

# Draw map into HTML file
gmap.draw("my_map.html")


