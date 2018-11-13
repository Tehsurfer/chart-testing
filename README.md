# chart-testing
A repository that is testing the ability of javascript charts to be updated externally 

Build the charts with:

`npm install` 
Then one of 

`npm run chartjs`

`npm run plotly`

`npm run c3`

open the corresponding build after to check results 


## Conclusions

### Plotly
This is the best chart package I've found so far. It is built on top of d3, so does not require d3 as a dependency. It's total download size is 6MB. The upsidedes of this package is the full featured, but fast linegraph and the built in support for updating parts of the graph without redrawing the whole thing

### Chart.js
Chart.js seemed to struggle to handle the data I gave it, but I guess one could expect 5 x 12,000 len arrays to be a challenge. Chart.js does not have a built in vertical line marker so I had to extend the line class to make one. Trying to update this extended class over time is painfully slow. Package size is 7MB

### c3
C3 appears easy to work with out of the box, but the fact that a title of data is the first element of an *array* means that I had to do some heavy processing to get my .csv data into it. Even once doing so I still had issues plotting the data correctly. You can update elements of the graph by deleting them then adding them in again which works reasonably smoothly but adds extra callbacks. Package size is 1MB but it has a dependency d3 which is 5MB
