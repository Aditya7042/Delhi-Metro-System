const stationGraph = {
    "1": {"2" : 1, "14": 3},
    "2": {"1" : 1, "3": 1},
    "3": {"2" : 1, "4": 1,"9": 2,"6": 1},
    "4": {"5" : 1, "3": 1},
    "5": {"11" : 1, "4": 1},
    "6": {"7" : 1, "3": 1},
    "7": {"8" : 1, "6": 1},
    "8": {"7" : 1},
    "9": {"10" : 1, "3": 1},
    "10": {"9" : 1},
    "11": {"12" : 3, "5": 1},
    "12": {"13" : 1, "11": 3},
    "13": {"12" : 1},
    "14": {"15" : 10, "16": 3, "1": 3},
    "15": {"14" : 10},
    "16": {"17" : 2, "14": 3},
    "17": {"18" : 4, "16": 2},
    "18": {"17" : 4}
  };
  

const stationData = {
    "1": "Shubhash Nagar",
    "2": "Tagore Garden",
    "3": "Rajouri Garden",
    "4": "Ramesh Nagar",
    "5": "Moti Nagar",
    "6": "Mayapuri",
    "7": "Naraina Vihar ",
    "8": "Delhi Cantt.",
    "9": "Punjabi Bagh",
    "10": "Netaji Subhash Palace",
    "11": "Kirtinagar",
    "12": "Rajendra Place",
    "13": "Karol Bagh",
    "14": "Janakpuri West",
    "15": "Dwarka Sector-10",
    "16": "Palam",
    "17": "IGI Airport",
    "18": "RK Puram"


};

const mapping = new Map();
for (const [code, station] of Object.entries(stationData)) {
    mapping.set(code, station);
}


let StartingStation = document.getElementById("StartingStation");
let EndingStation = document.getElementById("EndingStation");
// set start stations
for (var [key, value] of mapping) {
    var optionElement = document.createElement("option");
    optionElement.value = key;
    optionElement.textContent = value;
    StartingStation.appendChild(optionElement);
}
// set end stations
for (var [key, value] of mapping) {
    var optionElement = document.createElement("option");
    optionElement.value = key;
    optionElement.textContent = value;
    EndingStation.appendChild(optionElement);
}


// Dijkstra's algorithm to find the shortest path
function dijkstra(graph, start, end) {
    const shortestDistances = {};
    const predecessors = {};
    const unvisitedNodes = Object.keys(graph);

    unvisitedNodes.forEach(node => {
        shortestDistances[node] = Infinity;
    });

    shortestDistances[start] = 0;

    while (unvisitedNodes.length > 0) {
        let currentNode = null;

        unvisitedNodes.forEach(node => {
            if (currentNode === null || shortestDistances[node] < shortestDistances[currentNode]) {
                currentNode = node;
            }
        });

        const neighbors = graph[currentNode];

        for (const neighbor in neighbors) {
            const distance = neighbors[neighbor];
            const tentativeDistance = shortestDistances[currentNode] + distance;

            if (tentativeDistance < shortestDistances[neighbor]) {
                shortestDistances[neighbor] = tentativeDistance;
                predecessors[neighbor] = currentNode;
            }
        }

        unvisitedNodes.splice(unvisitedNodes.indexOf(currentNode), 1);
    }

    const path = [];
    let current = end;

    while (current !== start) {
        path.unshift(current);
        current = predecessors[current];
    }

    path.unshift(start);
    let displayPath=[];
    for(let i of path)
         displayPath.push(mapping.get(i));

    return {
        path,
        displayPath,
        distance: shortestDistances[end],
    };
}

function findShortestPath() {
    const result = dijkstra(stationGraph, StartingStation.value, EndingStation.value);
    const resultDiv = document.getElementById("shortestPathResult");
    resultDiv.innerHTML = `<b>Shortest Path: </b>  <br><br>  ${result.displayPath.join( "&#8594" )}<br><br><b>Distance: </b> ${result.distance} KM`;
}